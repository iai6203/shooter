import './index.scss'
import Tower from './assets/objects/tower'
import Area from './assets/objects/area'
import Enemy from './assets/objects/enemy'
import Bullet from './assets/objects/bullet'
import { collisionDetect } from "./assets/util/physics";
import Particle from "./assets/objects/particle";

class App {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D

  private stageWidth: number
  private stageHeight: number

  // objects
  private tower: Tower
  private area: Area
  private readonly enemies: Enemy[]
  private readonly bullets: Bullet[]
  private readonly particles: Particle[]

  constructor() {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    document.body.appendChild(this.canvas)

    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    // objects
    this.tower = new Tower(this.stageWidth / 2, this.stageHeight / 2)
    this.area = new Area(this.stageWidth / 2, this.stageHeight / 2)
    this.enemies = []
    this.bullets = []
    this.particles = []

    const enemyInterval = setInterval(() => {
      const enemy = new Enemy(this.stageWidth, this.stageHeight)
      const bullet = new Bullet(this.stageWidth / 2, this.stageHeight / 2, enemy.getX, enemy.getY)
      this.enemies.push(enemy)
      this.bullets.push(bullet)
    }, 1000)

    window.requestAnimationFrame(this.animate.bind(this))
  }

  private explode(x: number, y: number, size: number) {
    for (let i = 0; i < size; i++) {
      const particle = new Particle(x, y)
      this.particles.push(particle)
    }
  }

  private resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight
    this.canvas.width = this.stageWidth * 2
    this.canvas.height = this.stageHeight * 2
    this.ctx.scale(2, 2)
  }

  private animate() {
    window.requestAnimationFrame(this.animate.bind(this))
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    this.tower.draw(this.ctx)
    this.area.draw(this.ctx)

    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i]
      enemy.update()
      enemy.draw(this.ctx)
    }

    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i]

      // collision
      for (let j = 0; j < this.enemies.length; j++) {
        const enemy = this.enemies[j]
        const isCollision = collisionDetect(
          bullet.getX,
          bullet.getY,
          bullet.getSize,
          enemy.getX,
          enemy.getY,
          enemy.getSize
        )
        if (isCollision) {
          // collision detected!
          this.enemies.splice(j, 1)
          this.bullets.splice(i, 1)
          this.explode(enemy.getX, enemy.getY, enemy.getSize)
          break
        }
      }

      bullet.update()
      bullet.draw(this.ctx)
    }

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i]

      if (!particle.getLife) {
        this.particles.splice(i, 1)
        i--
      }

      particle.update()
      particle.draw(this.ctx)
    }
  }
}

window.onload = () => new App()
