let canvas = document.querySelector("canvas")
let ctx = canvas.getContext("2d")
let stars;
let starCount = Math.floor(Math.PI * 100)
let speed = 3

const random = Math.random

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Star {
    constructor() {
        this.init()
    }
    init() {
        this.position = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }
        this.velocity = {
            x: random() * speed,
            y: random() * speed
        }
        this.size = random() * 3

        if (random() < 1 / 2) {
            this.velocity.x *= -1
            this.velocity.y *= -1
        }
    }

    draw() {
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }

    update() {
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        ctx.globalCompositeOperation = "lighter"

        if (this.isDead()) {
            this.init()
        }

        this.draw()

    }
    isDead() {
        return this.position.x < 0 || this.position.y < 0 || this.position.x > window.innerWidth || this.position.y > this.innerHeight
    }
}

stars = Array.from(Array(starCount), () => new Star())
animate()

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(star => star.update())
    requestAnimationFrame(animate)
}