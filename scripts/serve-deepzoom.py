"""Local-only tile server for QA; serves only the generated tile allowlist."""
from pathlib import Path
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
import json,argparse,re
p=argparse.ArgumentParser();p.add_argument('--directory',required=True);p.add_argument('--port',type=int,default=5175);a=p.parse_args();root=Path(a.directory).resolve();index=json.loads((root/'tile-index.json').read_text());prefix='/tiles/'+index['releaseTag']+'/'
class Handler(BaseHTTPRequestHandler):
 def do_GET(self):
  path=self.path.split('?')[0];match=re.fullmatch(r'([a-z0-9-]+)/(\d+)/(\d+)_(\d+)\.jpg',path[len(prefix):]) if path.startswith(prefix) else None
  try:
   if not match:raise ValueError()
   vid,level,x,y=match.groups();v=index['views'][vid];cols,rows,entries=v['levels'][level];x=int(x);y=int(y)
   if x>=cols or y>=rows:raise ValueError()
   offset,size=entries[y*cols+x]
   with (root/'archives'/v['archive']).open('rb') as f:f.seek(offset);raw=f.read(size)
   self.send_response(200);self.send_header('Content-Type','image/jpeg');self.send_header('Content-Length',str(size));self.send_header('Cache-Control','public, max-age=3600');self.send_header('Access-Control-Allow-Origin','*');self.end_headers();self.wfile.write(raw)
  except (KeyError,ValueError,IndexError):self.send_error(404)
  except (BrokenPipeError,ConnectionResetError):pass
 def log_message(self,*args):pass
print(f'Local tile QA: http://127.0.0.1:{a.port}',flush=True);ThreadingHTTPServer(('127.0.0.1',a.port),Handler).serve_forever()
