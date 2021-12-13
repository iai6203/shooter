import { Velocity } from '../../ts/interfaces/objects.interfaces'

class Bullet {
  private x: number
  private y: number
  private readonly size: number
  private velocity: Velocity

  constructor(x: number, y: number, tx: number, ty: number) {
    this.x = x
    this.y = y
    this.size = 5

    const speedDivider = 75
    this.velocity = {
      x: (tx - this.x) / speedDivider,
      y: (ty - this.y) / speedDivider,
    }
  }

  get getX() {
    return this.x
  }

  get getY() {
    return this.y
  }

  get getSize() {
    return this.size
  }

  update() {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
    ctx.fillStyle = '#fff'
    ctx.closePath()
    ctx.fill()
  }
}

export default Bullet
