import test from 'node:test'
import assert from 'node:assert/strict'
import {addedLight,brightnessBudget,skyMagnitude,modelCrossing,skyLimitedExposure,INITIAL_SOURCES} from '../src/skyglow-model.ts'
const close=(a,b,t=1e-6)=>assert.ok(Math.abs(a-b)<t,`${a} != ${b}`)
test('a magnitude tolerance is converted to a linear light budget',()=>{close(brightnessBudget(.01),.0092528860766845);close(skyMagnitude(0),22);close(skyMagnitude(1),22-2.5*Math.log10(2))})
test('the corrected three-source example crosses the budget only in combination',()=>{const rs=INITIAL_SOURCES.map(s=>addedLight(s.population,s.distance));const budget=brightnessBudget(.01);assert.ok(rs.every(r=>r<budget));const sum=rs.reduce((a,b)=>a+b,0);assert.ok(sum>budget);close(sum,.018573,1e-6);close(skyMagnitude(sum),21.980020,1e-5);assert.ok(addedLight(10_000,20)>budget)})
test('population-distance crossings agree with the equation, not Bortle boundaries',()=>{const budget=brightnessBudget(.01);for(const [p,expected] of [[1e4,23.46],[1e5,57.33],[1e6,126.74],[1e7,225.16]]){const d=modelCrossing(p,budget);close(d,expected,.02);close(addedLight(p,d),budget,1e-12)}})
test('the optional envelope reduces distant contributions, with no hard cutoff',()=>{assert.ok(addedLight(1e7,300)<addedLight(1e7,300,false));assert.ok(addedLight(1e7,500)>0);assert.ok(addedLight(1e4,20)>addedLight(1e4,40));close(addedLight(1e4,25)*10,addedLight(1e5,25))})
test('invalid physical inputs are rejected',()=>{assert.throws(()=>addedLight(1e4,0),RangeError);assert.throws(()=>addedLight(-1,20),RangeError);assert.throws(()=>skyMagnitude(-.1),RangeError)})
test('exposure factors preserve faint-source S/N under a changed sky background',()=>{
  close(skyLimitedExposure(22,22),1)
  close(skyLimitedExposure(22,21),2.51188643150958)
  close(skyLimitedExposure(22,20.5)*4,15.92428682213989)
  const brighter=22-2.5*Math.log10(2.4), factor=skyLimitedExposure(22,brighter)
  close(factor,2.4);close(95/factor,39.5833333333333)
  // A separate photon-count calculation has equal S/N when integration grows with sky rate.
  const source=.03, sky=12, time=3600
  close(source*time/Math.sqrt(sky*time), source*(time*factor)/Math.sqrt((sky*factor)*(time*factor)))
  close(skyLimitedExposure(21,22),1/skyLimitedExposure(22,21))
  assert.throws(()=>skyLimitedExposure(NaN,20),RangeError)
})
