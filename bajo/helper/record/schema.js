async function schema ({ repo, req }) {
  const { getPlugin, importPkg } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  const { pick } = await importPkg('lodash-es')
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const schema = pick(await getSchema(repo ?? req.params.repo), ['name', 'properties', 'disabled'])
  return schema
}

export default schema
