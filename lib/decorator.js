import path from 'path'

const types = ['instance', 'request', 'reply']

async function decorator () {
  const { eachPlugins, importModule, importPkg, log, isSet } = this.bajo.helper
  const { orderBy, each, filter, upperFirst, camelCase, map, isPlainObject, concat } = await importPkg('lodash-es')
  let mods = []
  await eachPlugins(async function ({ cfg, file, plugin }) {
    let mod = await importModule(file)
    if (isPlainObject(mod)) mod = [mod]
    mod = filter(map(mod, m => {
      if (!m.level) m.level = 999
      if (m.name) m.name = camelCase(`${plugin} ${m.name}`)
      m.type = path.basename(file, '.js').toLowerCase()
      m.value = m.value ?? null
      return m
    }), m => isSet(m.name))
    if (mod.length > 0) mods = concat(mods, mod)
  }, { glob: `decorator/{${types.join(',')}}.js` })
  mods = orderBy(mods, ['type', 'level'])
  each(types, type => {
    const items = filter(mods, { type })
    if (items.length === 0) return undefined
    const key = 'decorate' + (type === 'instance' ? '' : upperFirst(type))
    each(items, i => {
      this.bajoWeb.instance[key](i.name, i.value)
    })
    log.trace('Decorate %s with \'%s\'', type, map(items, 'name').join(', '))
  })
}

export default decorator
