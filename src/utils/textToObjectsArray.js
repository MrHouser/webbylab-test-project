const arrayToObject = (array) => {
  const result = array.reduce((acc, item, index) => {
    const keyValue = item.split(": ")
    if (keyValue.includes("Title")) {
      keyValue.splice(0, 1, "title")
    } else if (keyValue.includes("Release Year")) {
      keyValue.splice(0, 1, "year")
    } else if (keyValue.includes("Format")) {
      keyValue.splice(0, 1, "format")
    } else if (keyValue.includes("Stars")) {
      keyValue.splice(0, 1, "actors")
      keyValue[1].split(", ")
    }
    acc[keyValue[0]] = keyValue[1]
    return acc
  }, {})
  result.actors = result.actors.split(", ")
  return result
}

const convertText = (text) => {
  const array = text
    .split("\n")
    .filter((n) => n)
    .reduce((acc, item, index) => {
      const chunkIndex = Math.floor(index / 4)
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = []
      }
      acc[chunkIndex].push(item)
      return acc
    }, [])

  const result = array.map((movieArr) => {
    return arrayToObject(movieArr)
  })
  return result
}

module.exports = convertText
