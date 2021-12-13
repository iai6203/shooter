import { getRandNum } from '../util/radom'
import { Velocity } from '../../ts/interfaces/objects.interfaces'

class Enemy {
  private x: number
  private y: number
  private readonly size: number
  private readonly velocity: Velocity

  constructor(stageWidth: number, stageHeight: number) {
    this.size = getRandNum({ min: 20, max: 100 })

    const isX = Math.round(Math.random()) === 1
    const direction = Math.round(Math.random()) === 1
    if (isX) {
      this.x = direction ? -this.size : stageWidth + this.size
      this.y = getRandNum({ min: 0 - this.size, max: stageHeight + this.size })
    } else {
      this.x = getRandNum({ min: 0 - this.size, max: stageWidth + this.size })
      this.y = direction ? -this.size : stageHeight + this.size
    }

    const speed = getRandNum({ min: 100, max: 200 })
    this.velocity = {
      x: ((stageWidth / 2) - (this.x + this.size / 2)) / speed,
      y: ((stageHeight / 2) - (this.y + this.size / 2)) / speed,
    }
  }

  get getX() {
    return this.x + (this.size / 2)
  }

  get getY() {
    return this.y + (this.size / 2)
  }

  get getSize() {
    return this.size
  }

  update() {
    const { x, y } = this.velocity
    this.x += x
    this.y += y
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.rect(this.x, this.y, this.size, this.size)
    ctx.strokeStyle = '#bfd28e'
    ctx.closePath()
    ctx.stroke()
  }
}

export default Enemy
