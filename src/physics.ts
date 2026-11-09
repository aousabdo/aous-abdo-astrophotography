// Educational models. None is fitted to the portfolio imagery.
export const transmission = (tau:number, factor=1) => Math.exp(-tau*factor)
export const stromgrenRadiusPc = (density:number) => Math.cbrt(3e49/(4*Math.PI*2.6e-13*density*density))/3.085677581e18
export const expansionYears = (radiusLy:number, speedKmS:number) => radiusLy*9.460730472e12/speedKmS/(365.25*86400)
export const solarPeriodDays = (latitudeDeg:number) => 25+11*Math.sin(latitudeDeg*Math.PI/180)**2
export const lunarFraction = (phaseAngleDeg:number) => (1+Math.cos(phaseAngleDeg*Math.PI/180))/2
