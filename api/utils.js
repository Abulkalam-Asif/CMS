function removeExtraSpaces(string) {
  if (typeof string === "string") {
    return string.replace(/\s+/g, ' ').trim();
  }
  return string;
}

module.exports = { removeExtraSpaces };