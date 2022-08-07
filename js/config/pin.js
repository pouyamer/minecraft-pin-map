const pinConfig = Object.values(TYPES).map(type => {
  switch (type) {
    case "hostile_mob":
      return {
        name: type,
        backgroundColor: "#fa2525",
        borderColor: "#761515"
      }
    case "mob":
      return {
        name: type,
        backgroundColor: "#f5a623",
        borderColor: "#7b4f0f"
      }
    case "npc":
      return {
        name: type,
        backgroundColor: "#00d419",
        borderColor: "#00a300"
      }
    case "block":
      return {
        name: type,
        backgroundColor: "#ad5300",
        borderColor: "#8d3e00"
      }

    case "item":
      return {
        name: type,
        backgroundColor: "#3b4b77",
        borderColor: "#2b3b4b"
      }
    case "biome":
      return {
        name: type,
        backgroundColor: "#00bcd4",
        borderColor: "#0097a7"
      }

    default:
      throw new Error(`Unknown type: ${type}`)
      break
  }
})
