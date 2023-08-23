function routePath (name) {
  const { routeDir } = this.bajoWeb.helper
  const { breakNsPath } = this.bajo.helper
  const [ns, path] = breakNsPath(name)
  return routeDir(ns) + path
}

export default routePath
