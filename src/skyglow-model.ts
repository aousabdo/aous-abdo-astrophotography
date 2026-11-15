/** An illustrative population-distance experiment, not a calibrated site forecast. */
export type LightSource = { name: string; population: number; distance: number; enabled: boolean; color: string }
export const MODEL = { normalization: 0.0025, exponent: 2.5, envelopeKm: 200, baseline: 22 }
export const INITIAL_SOURCES: LightSource[] = [
  { name: 'Nearby town', population: 10_000, distance: 25, enabled: true, color: '#e8b180' },
  { name: 'Regional city', population: 100_000, distance: 70, enabled: true, color: '#9bcbbd' },
  { name: 'Distant metropolis', population: 10_000_000, distance: 250, enabled: true, color: '#d6a1c6' },
]
export function addedLight(population: number, distanceKm: number, envelope = true): number {
  if (!Number.isFinite(population) || population < 0 || !Number.isFinite(distanceKm) || distanceKm <= 0) throw new RangeError('Population must be nonnegative and distance positive.')
  return MODEL.normalization * population * distanceKm ** -MODEL.exponent * (envelope ? Math.exp(-((distanceKm / MODEL.envelopeKm) ** 2)) : 1)
}
export function skyMagnitude(ratio: number, baseline = MODEL.baseline): number {
  if (!Number.isFinite(ratio) || ratio < 0 || !Number.isFinite(baseline)) throw new RangeError('Invalid brightness ratio or baseline.')
  return baseline - 2.5 * Math.log10(1 + ratio)
}
export function brightnessBudget(magnitudeDrop: number): number {
  if (!Number.isFinite(magnitudeDrop) || magnitudeDrop <= 0) throw new RangeError('Brightness tolerance must be positive.')
  return 10 ** (magnitudeDrop / 2.5) - 1
}
export function modelCrossing(population: number, target: number, envelope = true): number {
  if (population <= 0 || !Number.isFinite(population) || target <= 0 || !Number.isFinite(target)) throw new RangeError('Invalid crossing inputs.')
  let low = 0.001, high = 10_000
  for (let i = 0; i < 80; i++) {
    const middle = (low + high) / 2
    if (addedLight(population, middle, envelope) > target) low = middle
    else high = middle
  }
  return (low + high) / 2
}

/** Fixed source rate and S/N, with sky shot noise dominating in the same passband and area. */
export function skyLimitedExposure(referenceMagnitude: number, comparisonMagnitude: number): number {
  if (!Number.isFinite(referenceMagnitude) || !Number.isFinite(comparisonMagnitude)) throw new RangeError('Sky magnitudes must be finite.')
  return 10 ** (0.4 * (referenceMagnitude - comparisonMagnitude))
}
