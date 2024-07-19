async function reroutedPath (path, mapper = {}) {
  const { routePath } = this.app.bajoWeb
  let result
  for (let k in mapper) {
    const v = routePath(mapper[k])
    k = routePath(k)
    if (k === path) result = v
  }
  return result
}

export default reroutedPath
