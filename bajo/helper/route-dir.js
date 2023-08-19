function routeDir (plugin, base) {
  const { getConfig } = this.bajo.helper
  if (!base) base = plugin
  const cfg = getConfig(base)
  const dir = cfg.prefix === '' ? '' : `/${cfg.prefix}`
  if (!plugin) return dir
  if (plugin === base || (plugin === 'app' && cfg.mountAppAsRoot)) return dir
  const cfgP = getConfig(plugin, { full: true })
  return dir + '/' + cfgP.alias
}

export default routeDir
