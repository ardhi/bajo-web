function routePath (name, { query = {} } = {}) {
  const { routeDir, defaultsDeep } = this.bajoWeb.helper
  const { breakNsPath } = this.bajo.helper
  const [ns, fullPath] = breakNsPath(name)
  let [path, qs] = fullPath.split('?')
  let url = routeDir(ns) + path
  if (this.bajoWeb.vars) {
    const { queryString, isEmpty } = this.bajoWeb.vars
    qs = defaultsDeep(query, queryString.parse(qs))
    if (!isEmpty(qs)) url += '?' + queryString.stringify(qs)
  }
  return url
}

export default routePath
