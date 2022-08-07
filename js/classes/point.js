// A Point Defined in Cartesian Coordinate System
// - size: { width, height } - the size of the canvas
class Point {
  constructor(x, y, backgroundColor, borderColor) {
    this.x = x
    this.y = y

    this.backgroundColor = backgroundColor
    this.borderColor = borderColor
  }

  draw = (ctx, from, to, zoom) => {
    // ctx is the canvas context
    // translate the point to the cartesian coordinate system

    const fx = from.x * zoom
    const ty = to.y * zoom
    const cX = (this.x - fx) * zoom
    const cY = (ty - this.y) * zoom

    ctx.fillStyle = this.backgroundColor
    ctx.strokeStyle = this.borderColor
    ctx.beginPath()
    ctx.arc(cX, cY, 5, 0, 2 * Math.PI)
    ctx.fill()
    ctx.stroke()
  }
}
