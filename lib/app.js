export async function collect (glob = 'boot.js', ns) {
  const { eachPlugins, importModule, importPkg, fatal } = this.bajo.helper
  const { orderBy, each } = await importPkg('lodash-es')
  const mods = []
  await eachPlugins(async function ({ cfg, file, plugin }) {
    const mod = await importModule(file, { asHandler: true })
    mod.prefix = cfg.prefix
    mod.plugin = plugin
    mods.push(mod)
  }, { glob, ns })
  const prefixes = {}
  each(mods, m => {
    if (!m.prefix) return undefined
    if (!prefixes[m.prefix]) prefixes[m.prefix] = []
    prefixes[m.prefix].push(m.plugin)
    if (prefixes[m.prefix].length > 1) fatal('Plugin prefix \'%s\' conflic between \'%s\' and \'%s\'', m.prefix, prefixes[m.prefix][0], prefixes[m.prefix][1])
  })
  return orderBy(mods, ['level'])
}

export async function boot () {
  const { log } = this.bajo.helper
  const mods = await collect.call(this)
  for (const m of mods) {
    log.debug('Boot app: %s', m.plugin)
    await m.handler.call(this)
  }
}
