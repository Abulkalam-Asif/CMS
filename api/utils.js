function removeExtraSpaces(string) {
  if (typeof string === "string") {
    return string.replace(/\s+/g, ' ').trim();
  }
  return string;
}
// This function takes an array of keys and filter the object and returns a new object having only the keepOnlyKeys
function filterKeys(keepOnlyKeys, obj) {
  const newObj = {};
  keepOnlyKeys.forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
}

module.exports = { removeExtraSpaces, filterKeys };