function routePath (name, { query = {}, base = 'bajoWebMpa', params = {} } = {}) {
  const { getConfig } = this.bajo.helper
  const { routeDir, defaultsDeep } = this.bajoWeb.helper
  const { breakNsPath } = this.bajo.helper
  const cfg = getConfig(base)
  const [ns, fullPath] = breakNsPath(name)
  let [path, qs] = fullPath.split('?')
  let url = cfg.i18nDetectors.includes('path') ? `/${params.lang ?? ''}${routeDir(ns)}${path}` : `${routeDir(ns)}${path}`
  if (this.bajoWeb.vars) {
    const { queryString, isEmpty } = this.bajoWeb.vars
    qs = defaultsDeep(query, queryString.parse(qs))
    if (!isEmpty(qs)) url += '?' + queryString.stringify(qs)
  }
  return url
}

export default routePath
