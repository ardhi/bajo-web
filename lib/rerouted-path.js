async function reroutedPath (path, mapper = {}) {
  let result
  for (let k in mapper) {
    const v = this.routePath(mapper[k])
    k = this.routePath(k)
    if (k === path) result = v
  }
  return result
}

export default reroutedPath
