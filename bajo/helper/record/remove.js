async function remove ({ coll, req, reply, id }) {
  const { pascalCase, getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordRemove } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'coll', 'id')
  const { fields } = params
  coll = coll ?? params.coll
  id = id ?? params.id ?? req.query.id
  return await recordRemove(pascalCase(coll), id, { fields, dataOnly: false, req })
}

export default remove
