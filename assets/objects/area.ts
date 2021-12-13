class Area {
  private readonly x: number
  private readonly y: number
  private readonly r: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.r = 300
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false)
    ctx.strokeStyle = '#fff'
    ctx.closePath()
    ctx.stroke()
  }
}

export default Area