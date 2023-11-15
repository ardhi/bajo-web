async function find ({ coll, req, reply }) {
  const { pascalCase, getPlugin, getConfig } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordFind, attachmentFind } = this.bajoDb.helper
  const { parseFilter, getParams } = this.bajoWeb.helper
  const cfg = getConfig('bajoWeb')
  const params = await getParams(req, 'coll')
  const { fields } = params
  coll = coll ?? params.coll
  const filter = parseFilter(req)
  const name = pascalCase(coll)
  const bboxLatField = req.query[cfg.qsKey.bboxLatField]
  const bboxLngField = req.query[cfg.qsKey.bboxLngField]
  const ret = await recordFind(name, filter, { fields, dataOnly: false, req, bboxLatField, bboxLngField })
  const { attachment, stats, mimeType } = req.query
  if (attachment) {
    for (const d of ret.data) {
      d._attachment = await attachmentFind(name, d.id, { stats, mimeType })
    }
  }
  return ret
}

export default find
