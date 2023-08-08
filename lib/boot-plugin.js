async function app () {
  const { eachPlugins, importModule, importPkg, fatal } = this.bajo.helper
  const { orderBy, each } = await importPkg('lodash-es')
  let mods = []
  await eachPlugins(async function ({ cfg, file, plugin }) {
    const mod = await importModule(file, { asHandler: true })
    mod.prefix = cfg.prefix
    mod.plugin = plugin
    mods.push(mod)
  }, { glob: 'plugin.js' })
  const prefixes = {}
  each(mods, m => {
    if (!m.prefix) return undefined
    if (!prefixes[m.prefix]) prefixes[m.prefix] = []
    prefixes[m.prefix].push(m.plugin)
    if (prefixes[m.prefix].length > 1) fatal('Plugin prefix \'%s\' conflic between \'%s\' and \'%s\'', m.prefix, prefixes[m.prefix][0], prefixes[m.prefix][1])
  })

  mods = orderBy(mods, ['level'])
  for (const m of mods) {
    await m.handler.call(this)
  }
}

export default app
