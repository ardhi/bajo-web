async function schema (coll, meta = {}) {
  const { getPlugin, importPkg } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick, get, filter } = await importPkg('lodash-es')
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const schema = pick(await getSchema(coll), ['name', 'properties', 'disabled'])
  const hidden = get(meta, 'display.list.hidden', [])
  schema.properties = filter(schema.properties, p => !hidden.includes(p.name))
  return schema
}

export default schema
