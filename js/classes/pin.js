class Pin {
  constructor(name, x, y, z, isInUnderground, type, keywords) {
    this.name = name
    this.location = new Location(x, y, z)
    this.type = type
    this.keywords = keywords
    this.isInUnderground = isInUnderground
  }
}
