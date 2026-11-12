"""Prepare local, faithful Deep Zoom pyramids from a private source manifest.
Usage: python3 scripts/prepare-deepzoom.py --sources sources.json --output DIR
No input image is modified. Only the output folder receives generated files.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageCms, ImageFile
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse, json, hashlib, io, math, zipfile, struct, time
ImageFile.MAXBLOCK=64*1024*1024
parser=argparse.ArgumentParser();parser.add_argument('--sources',required=True);parser.add_argument('--output',required=True);parser.add_argument('--jobs',type=int,default=2);args=parser.parse_args()
OUT=Path(args.output).resolve();OUT.mkdir(parents=True,exist_ok=True);(OUT/'archives').mkdir(exist_ok=True);(OUT/'audit').mkdir(exist_ok=True)
sources=json.loads(Path(args.sources).read_text());TAG='full-resolution-2026-11-v1';TILE=512;OVERLAP=1
BASE=f'https://github.com/aousabdo/aous-abdo-astrophotography/releases/download/{TAG}/'
ORIGIN='https://aous-abdo-astrophotography.aousabdo.chatgpt.site';SRGB=ImageCms.createProfile('sRGB');ICC=ImageCms.ImageCmsProfile(SRGB).tobytes()
README='''ONE MORE PHOTON — FULL-RESOLUTION EXPLORATION
Photographs by Aous Abdo · https://onemorephoton.com/

These locally generated image pyramids power the website's zoom viewer.
Each archive contains one photograph at progressively smaller resolutions.
The highest level retains the recorded pixel dimensions of the finished
source image. No enlargement, sky extension, rotation or invented detail is
applied. The finished image is converted to sRGB and tiled as quality-92,
4:4:4 JPEGs, with a one-pixel overlap to avoid seams. Private source paths
and capture metadata are excluded from these public archives.

Photography remains copyright Aous Abdo. These viewer assets do not grant
commercial use, republication or redistribution rights. For personal device
backgrounds, use the curated wallpaper collection on the website.
'''
(OUT/'README.txt').write_text(README)
def prepare(item):
 src=Path(item['source']);sourceHash=hashlib.sha256(src.read_bytes()).hexdigest();vid=item['id'];name=f'one-more-photon-{vid}-full-resolution.zip';dest=OUT/'archives'/name;audit=OUT/'audit'/(vid+'.json');stamp=f'{sourceHash}:512:1:q92:srgb:v1'
 if dest.exists() and audit.exists():
  old=json.loads(audit.read_text())
  if old.get('stamp')==stamp and old.get('archiveSha256')==hashlib.sha256(dest.read_bytes()).hexdigest():return old
 with Image.open(src) as original:
  im=ImageOps.exif_transpose(original);im.load();profile=im.info.get('icc_profile');im=im.convert('RGB')
 if im.size!=(item['width'],item['height']):raise ValueError(f'Source dimensions changed: {vid}, {im.size}')
 if profile:im=ImageCms.profileToProfile(im,ImageCms.ImageCmsProfile(io.BytesIO(profile)),SRGB,outputMode='RGB')
 width,height=im.size;maximum=math.ceil(math.log2(max(width,height)));levels={};hashes={};temp=dest.with_suffix('.partial');current=im
 with zipfile.ZipFile(temp,'w',compression=zipfile.ZIP_STORED) as z:
  z.writestr('README.txt',README)
  for level in range(maximum,-1,-1):
   scale=2**(maximum-level);w,h=math.ceil(width/scale),math.ceil(height/scale)
   if current.size!=(w,h):current=current.resize((w,h),Image.Resampling.LANCZOS)
   columns,rows=math.ceil(w/TILE),math.ceil(h/TILE);entries=[]
   for y in range(rows):
    for x in range(columns):
     region=(max(0,x*TILE-OVERLAP),max(0,y*TILE-OVERLAP),min(w,(x+1)*TILE+OVERLAP),min(h,(y+1)*TILE+OVERLAP));tile=current.crop(region);buf=io.BytesIO();tile.save(buf,'JPEG',quality=92,subsampling=0,icc_profile=ICC);raw=buf.getvalue();entry=f'{vid}/{level}/{x}_{y}.jpg';z.writestr(entry,raw);entries.append(entry);hashes[entry]=hashlib.sha256(raw).hexdigest()
   levels[str(level)]=[columns,rows,entries]
 # Read actual ZIP offsets, then verify every indexed byte range and tile size.
 with zipfile.ZipFile(temp) as z,temp.open('rb') as f:
  for level,(cols,rows,entries) in levels.items():
   for i,entry in enumerate(entries):
    info=z.getinfo(entry);f.seek(info.header_offset);header=f.read(30);a,b=struct.unpack_from('<HH',header,26);offset=info.header_offset+30+a+b;f.seek(offset);raw=f.read(info.file_size)
    if hashlib.sha256(raw).hexdigest()!=hashes[entry]:raise ValueError('ZIP range mismatch '+entry)
    with Image.open(io.BytesIO(raw)) as tile:tile.verify()
    entries[i]=[offset,info.file_size]
 temp.replace(dest)
 result={'stamp':stamp,'id':vid,'photo':item['photo'],'title':item['title'],'source':str(src),'sourceSha256':sourceHash,'archive':name,'archiveBytes':dest.stat().st_size,'archiveSha256':hashlib.sha256(dest.read_bytes()).hexdigest(),'width':width,'height':height,'tileSize':TILE,'overlap':OVERLAP,'maxLevel':maximum,'levels':levels,'tiles':len(hashes)};audit.write_text(json.dumps(result,separators=(',',':'))+'\n');return result
started=time.time();results={}
with ThreadPoolExecutor(max_workers=args.jobs) as pool:
 futures=[pool.submit(prepare,item) for item in sources]
 for i,f in enumerate(as_completed(futures),1):
  row=f.result();results[row['id']]=row
  if i%8==0 or i==len(sources):print(f'{i}/{len(sources)} source views tiled · {time.time()-started:.0f}s',flush=True)
public={'edition':TAG,'tileBase':ORIGIN+'/tiles/'+TAG,'views':{}}
index={'releaseTag':TAG,'archiveBase':BASE,'views':{}};uploads=[]
for item in sources:
 r=results[item['id']];public['views'][r['id']]={k:r[k] for k in ['width','height','tileSize','overlap','maxLevel']};index['views'][r['id']]={k:r[k] for k in ['archive','width','height','tileSize','overlap','maxLevel','levels']};uploads.append(str(OUT/'archives'/r['archive']))
(OUT/'catalog.json').write_text(json.dumps(public,separators=(',',':'))+'\n');(OUT/'tile-index.json').write_text(json.dumps(index,separators=(',',':'))+'\n');(OUT/'SHA256SUMS.txt').write_text('\n'.join(results[i['id']]['archiveSha256']+'  '+results[i['id']]['archive'] for i in sources)+'\n');uploads.extend(str(OUT/name) for name in ['README.txt','SHA256SUMS.txt']);(OUT/'upload-files.json').write_text(json.dumps(uploads,indent=2))
print(json.dumps({'views':len(results),'tiles':sum(r['tiles'] for r in results.values()),'archiveMB':round(sum(r['archiveBytes'] for r in results.values())/1e6),'seconds':round(time.time()-started)}),flush=True)
