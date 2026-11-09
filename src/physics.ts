// Educational models. None is fitted to the portfolio imagery.
export const transmission = (tau:number, factor=1) => Math.exp(-tau*factor)
export const stromgrenRadiusPc = (density:number) => Math.cbrt(3e49/(4*Math.PI*2.6e-13*density*density))/3.085677581e18
export const expansionYears = (radiusLy:number, speedKmS:number) => radiusLy*9.460730472e12/speedKmS/(365.25*86400)
export const solarPeriodDays = (latitudeDeg:number) => 25+11*Math.sin(latitudeDeg*Math.PI/180)**2
export const lunarFraction = (phaseAngleDeg:number) => (1+Math.cos(phaseAngleDeg*Math.PI/180))/2
// Uniform, optically thin spherical shell; outer radius is one.
export const shellPathLength = (impact:number, innerRadius:number) => {
 const b=Math.abs(impact)
 if(b>=1)return 0
 return 2*Math.sqrt(1-b*b)-(b<innerRadius?2*Math.sqrt(innerRadius*innerRadius-b*b):0)
}
export const photonEnergyEv = (wavelengthNm:number) => 1239.841984/wavelengthNm
export const hydrogenIonizes = (wavelengthNm:number) => photonEnergyEv(wavelengthNm)>=13.5984
export const shadowLengthKm = (heightKm:number,elevationDeg:number) => heightKm/Math.tan(elevationDeg*Math.PI/180)
export const planckContrast = (temperatureK:number,referenceK=5800,wavelengthNm=550) => {
 const c2=1.438776877e7 // h c / k, in nm K
 return Math.expm1(c2/(wavelengthNm*referenceK))/Math.expm1(c2/(wavelengthNm*temperatureK))
}
