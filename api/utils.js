function removeExtraSpaces(string) {
  return string.replace(/\s+/g, ' ').trim();
}

module.exports = { removeExtraSpaces };