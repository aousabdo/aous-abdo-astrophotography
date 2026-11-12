import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { photographs } from '../src/gallery.ts'
const catalog=JSON.parse(await readFile(new URL('../src/deepzoom-catalog.json',import.meta.url),'utf8'))
const views=photographs.flatMap(p=>p.views)
assert.match(catalog.tileBase,/^https:\/\//)
assert.equal(Object.keys(catalog.views).length,views.length,'Every gallery view needs a matching source pyramid')
for(const view of views){
 const item=catalog.views[view.id]
 assert.ok(item,`Missing original image: ${view.id}`)
 assert.equal(item.width,view.width,`Source width changed: ${view.id}`)
 assert.equal(item.height,view.height,`Source height changed: ${view.id}`)
 assert.equal(item.maxLevel,Math.ceil(Math.log2(Math.max(view.width,view.height))))
 assert.ok(item.tileSize>0&&item.overlap>=0&&item.overlap<item.tileSize)
}
assert.ok(!JSON.stringify(catalog).includes('/Volumes/')&&!JSON.stringify(catalog).includes('/Users/'),'No private paths in public metadata')
console.log(`All ${views.length} gallery views match their original pixel dimensions and tile geometry.`)
