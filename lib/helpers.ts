export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined
}

export function remCalc({
  value,
  baseValue = 16,
}: {
  value: number
  baseValue?: number
}) {
  return `${value / baseValue}rem`
}

export function clampCalc({
  value,
  baseValue = 16,
}: {
  value: number
  baseValue?: number
}) {
  return `clamp(${value}px, ${value / baseValue}vw, ${value * 1.2}px)`
}
