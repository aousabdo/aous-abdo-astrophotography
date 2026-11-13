import assert from 'node:assert/strict'
import { encodeDedication, decodeDedication } from '../src/dedication-data.ts'
import { photographs } from '../src/gallery.ts'
const gift={v:1,photo:'heart',view:photographs.find(p=>p.id==='heart').views[0].id,to:'Zoë & ليلى ✨',message:'Different places. The same sky.\nいつもありがとう 🌌',from:'Aous',style:'paper'}
const encoded=encodeDedication(gift)
assert.match(encoded,/^[A-Za-z0-9_-]+$/)
assert.deepEqual(decodeDedication(encoded),gift,'A copied link must preserve Unicode and line breaks')
assert.deepEqual(decodeDedication('eyJ2IjoxLCJwaG90byI6ImhlYXJ0IiwidmlldyI6ImZpeHR1cmUiLCJ0byI6IkFkYSIsIm1lc3NhZ2UiOiJGb3IgeW91LiIsImZyb20iOiJBIiwic3R5bGUiOiJtaWRuaWdodCJ9'),{v:1,photo:'heart',view:'fixture',to:'Ada',message:'For you.',from:'A',style:'midnight'},'Keep v1 recipient links readable')
const raw=value=>Buffer.from(JSON.stringify(value)).toString('base64url')
for(const value of [null,[],{}, {...gift,v:2}, {...gift,to:''},{...gift,to:' '.repeat(5)},{...gift,to:'x'.repeat(41)},{...gift,message:'x'.repeat(241)},{...gift,from:[]},{...gift,style:'unknown'},{...gift,photo:'../../external'},{...gift,view:'https://example.com/a.jpg'},{...gift,message:'bad\u0000text'}]) assert.equal(decodeDedication(raw(value)),null)
for(const value of ['', '???', 'a'.repeat(5001),'_w','e30']) assert.equal(decodeDedication(value),null)
assert.throws(()=>encodeDedication({...gift,to:''}))
for(const photo of photographs) for(const view of photo.views) assert.deepEqual(decodeDedication(encodeDedication({...gift,photo:photo.id,view:view.id})),{...gift,photo:photo.id,view:view.id})
console.log('Dedication links preserve Unicode and v1 compatibility; reject malformed/oversized payloads; round-trip all96 image editions.')
