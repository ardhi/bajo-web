function routeDir (plugin, base) {
  const { getConfig } = this.bajo.helper
  if (!base) base = plugin
  const cfg = getConfig(base, { full: true })
  const dir = cfg.prefix === '' ? '' : `/${cfg.prefix || cfg.alias}`
  if (!plugin) return dir
  if (plugin === base || (plugin === 'app' && cfg.mountAppAsRoot)) return dir
  const cfgP = getConfig(plugin, { full: true })
  return dir + '/' + cfgP.alias
}

export default routeDir
