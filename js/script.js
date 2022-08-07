const fromToElement = document.querySelector(".from-to")
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const size = { width: 5000, height: 5000 }
canvas.width = size.width
canvas.height = size.height

let points = []
let zoom = 1
let mousePosition = { x: 0, y: 0 }

let currentRange = {
  from: {
    x: -size.width / 2,
    y: -size.height / 2
  },
  to: {
    x: size.width / 2,
    y: size.height / 2
  }
}

data.pins.forEach(pin => {
  const { location, type } = pin
  const { x, z } = location
  const { backgroundColor, borderColor } = config.pinConfig.find(
    config => config.name === type
  )
  points.push(
    new Point(
      x,
      z,
      backgroundColor,
      borderColor,
      currentRange.from,
      currentRange.to
    )
  )
})

let showingPoints = []

showingPoints = points.filter(({ x, y }) => {
  return (
    x >= currentRange.from.x &&
    x <= currentRange.to.x &&
    y >= currentRange.from.y &&
    y <= currentRange.to.y
  )
})

const animate = () => {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, size.width, size.height)

  points.forEach(point => {
    point.draw(ctx, currentRange.from, currentRange.to, zoom)
  })
  // Write the current range to canvas as numbers on the corners
  fromToElement.querySelector(".fx").innerText = to2Precision(
    currentRange.from.x
  )
  fromToElement.querySelector(".fy").innerText = to2Precision(
    currentRange.from.y
  )
  fromToElement.querySelector(".tx").innerText = to2Precision(currentRange.to.x)
  fromToElement.querySelector(".ty").innerText = to2Precision(currentRange.to.y)
}

const updateShowingPoints = (points, range) =>
  points.filter(
    ({ x, y }) =>
      x >= range.from.x &&
      x <= range.to.x &&
      y >= range.from.y &&
      y <= range.to.y
  )

// App start
animate()

canvas.addEventListener("mousemove", e => {
  mousePosition.x = e.offsetX
  mousePosition.y = e.offsetY
})
window.addEventListener("keypress", e => {
  switch (e.key) {
    case "w":
      currentRange.from.y = currentRange.to.y + 10 / zoom
      currentRange.to.y = currentRange.from.y + 10 / zoom
      showingPoints = updateShowingPoints(points, currentRange)

      break

    case "s":
      currentRange.from.y = currentRange.to.y - 10 / zoom
      currentRange.to.y = currentRange.from.y - 10 / zoom
      showingPoints = updateShowingPoints(points, currentRange)
      break

    case "a":
      currentRange.from.x = currentRange.from.x - 10 / zoom
      currentRange.to.x = currentRange.to.x - 10 / zoom
      showingPoints = updateShowingPoints(points, currentRange)
      break

    case "d":
      currentRange.from.x = currentRange.from.x + 10 / zoom
      currentRange.to.x = currentRange.to.x + 10 / zoom
      showingPoints = updateShowingPoints(points, currentRange)
      break

    case "+":
      zoom += 0.1
      currentRange.from.x = currentRange.from.x / zoom
      currentRange.from.y = currentRange.from.y / zoom
      currentRange.to.x = currentRange.to.x / zoom
      currentRange.to.y = currentRange.to.y / zoom

      break
    case "-":
      zoom /= 2
      currentRange.from.x = currentRange.from.x / zoom
      currentRange.from.y = currentRange.from.y / zoom
      currentRange.to.x = currentRange.to.x / zoom
      currentRange.to.y = currentRange.to.y / zoom
      break
  }
})
