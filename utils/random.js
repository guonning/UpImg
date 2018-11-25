module.exports = (low, high) => {
  return Math.floor(Math.random() * (high - low + 1) + low)
}
