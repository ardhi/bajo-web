async function find ({ coll, req, reply }) {
  const { pascalCase, getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordFind, attachmentFind } = this.bajoDb.helper
  const { getFilter, getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'coll')
  const { fields } = params
  coll = coll ?? params.coll
  const filter = await getFilter(req)
  const name = pascalCase(coll)
  const ret = await recordFind(name, filter, { fields, dataOnly: false, req })
  const { attachment, stats, mimeType } = req.query
  if (attachment) {
    for (const d of ret.data) {
      d._attachment = await attachmentFind(name, d.id, { stats, mimeType })
    }
  }
  return ret
}

export default find
