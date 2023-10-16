function routePath (name, { query = {}, base = 'bajoWebMpa', params = {} } = {}) {
  const { getConfig, defaultsDeep } = this.bajo.helper
  const { routeDir } = this.bajoWeb.helper
  const { breakNsPath } = this.bajo.helper
  const cfg = getConfig(base)
  const [ns, fullPath] = breakNsPath(name)
  let [path, queryString] = fullPath.split('?')
  path = path.split('/').map(p => {
    return p[0] === ':' && params[p.slice(1)] ? params[p.slice(1)] : p
  }).join('/')
  let url = cfg.i18n.detectors.includes('path') ? `/${params.lang ?? ''}${routeDir(ns)}${path}` : `${routeDir(ns)}${path}`
  const { qs, isEmpty } = this.bajoWebMpa.util
  queryString = defaultsDeep(query, qs.parse(queryString))
  if (!isEmpty(queryString)) url += '?' + qs.stringify(queryString)
  return url
}

export default routePath
