import fs from 'node:fs';
import assert from 'node:assert/strict';
import { photographs } from '../src/gallery.ts';
import * as p from '../src/physics.ts';
const objects=JSON.parse(fs.readFileSync(new URL('../src/science-objects.json',import.meta.url)));
for(const photo of photographs) {
 assert.ok(objects[photo.id], `Missing science for ${photo.id}`);
 assert.ok(objects[photo.id].lead.length>80, `Incomplete summary for ${photo.id}`);
}
assert.equal(p.transmission(0),1);
assert.ok(Math.abs(p.transmission(1)-1/Math.E)<1e-12);
assert.ok(p.transmission(4)<p.transmission(1));
assert.ok(Math.abs(p.stromgrenRadiusPc(100)/p.stromgrenRadiusPc(1000)-10**(2/3))<1e-10);
assert.ok(p.stromgrenRadiusPc(10)>14&&p.stromgrenRadiusPc(10)<15);
assert.ok(Math.abs(p.expansionYears(1,20)/p.expansionYears(1,40)-2)<1e-12);
assert.equal(p.solarPeriodDays(0),25);
assert.equal(p.solarPeriodDays(90),36);
assert.equal(p.lunarFraction(0),1);
assert.equal(p.lunarFraction(90),.5);
assert.equal(p.lunarFraction(180),0);
console.log(`Science summaries cover all ${photographs.length} subjects. All five model checks passed.`);
