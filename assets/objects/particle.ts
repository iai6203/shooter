import { getRandNum, trueOrNot } from '../util/radom'
import { Velocity } from '../../ts/interfaces/objects.interfaces'

class Particle {
  private life: boolean
  private x: number
  private y: number
  private r: number
  private velocity: Velocity
  private readonly color: string

  constructor(x: number, y: number) {
    this.life = true
    this.x = x
    this.y = y
    this.r = getRandNum({ min: 5, max: 20 })
    this.velocity = {
      x: trueOrNot() ? getRandNum({ min: 1, max: 10 }) : -getRandNum({ min: 1, max: 10 }),
      y: -getRandNum({ min: 1, max: 10 }),
    }

    const colors = ['#F2B705', '#F29F05', '#F28705']
    this.color = colors[Math.floor(Math.random()) * colors.length]
  }

  get getLife() {
    return this.life
  }

  update() {
    if (this.r < 1) {
      this.life = false
      return
    }

    this.velocity.x *= 0.95
    this.velocity.y += 0.25

    this.x += this.velocity.x
    this.y += this.velocity.y
    this.r *= 0.9
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    ctx.fillStyle = this.color
    ctx.closePath()
    ctx.fill()
  }
}

export default Particle
