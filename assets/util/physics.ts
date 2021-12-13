import { getDistance } from './math'

export const collisionDetect = (
  sx: number,
  sy: number,
  sr: number,
  tx: number,
  ty: number,
  tr: number
) => {
  const dis = getDistance(sx, sy, tx, ty)
  const size = sr + tr
  return dis < size
}
