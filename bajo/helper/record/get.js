async function get ({ coll, req, reply, id, options = {} }) {
  const { pascalCase, getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordGet, attachmentFind } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'coll', 'id')
  const { fields } = params
  coll = coll ?? params.coll
  id = id ?? params.id ?? req.query.id
  const name = pascalCase(coll)
  const ret = await recordGet(name, id, { fields, dataOnly: false, req })
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentFind(name, id, { stats, mimeType })
  return ret
}

export default get
