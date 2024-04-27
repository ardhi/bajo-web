import prepCrud from '../../../lib/prep-crud.js'

async function find ({ coll, req, reply, options = {} }) {
  const { getPlugin, getConfig } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordFindOne, attachmentFind } = this.bajoDb.helper
  const { parseFilter } = this.bajoWeb.helper
  const { name, opts } = prepCrud.call(this, { coll, req, options, args: ['coll'] })
  const cfg = getConfig('bajoWeb')
  opts.bboxLatField = req.query[cfg.qsKey.bboxLatField]
  opts.bboxLngField = req.query[cfg.qsKey.bboxLngField]
  const filter = parseFilter(req)
  const ret = await recordFindOne(name, filter, opts)
  ret.filter = filter
  const { attachment, stats, mimeType } = req.query
  if (attachment) {
    ret.data._attachment = await attachmentFind(name, ret.data.id, { stats, mimeType })
  }
  return ret
}

export default find
