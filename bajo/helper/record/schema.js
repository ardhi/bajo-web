async function schema ({ coll, req }) {
  const { getPlugin, importPkg } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick } = await importPkg('lodash-es')
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const schema = pick(await getSchema(coll ?? req.params.coll), ['name', 'properties', 'disabled'])
  return schema
}

export default schema
