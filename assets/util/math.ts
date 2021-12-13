export const getDistance = (
  source_x: number,
  source_y: number,
  target_x: number,
  target_y: number
) => {
  const disX = source_x - target_x
  const disY = source_y - target_y

  return Math.sqrt(disX * disX + disY * disY)
}
