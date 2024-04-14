import prepCrud from '../../../lib/prep-crud.js'

async function find ({ coll, req, reply, options = {} }) {
  const { getPlugin, getConfig } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordFind, attachmentFind } = this.bajoDb.helper
  const { parseFilter } = this.bajoWeb.helper
  const { name, opts } = await prepCrud.call(this, { coll, req, options, args: ['coll'] })
  const cfg = getConfig('bajoWeb')
  opts.bboxLatField = req.query[cfg.qsKey.bboxLatField]
  opts.bboxLngField = req.query[cfg.qsKey.bboxLngField]
  const ret = await recordFind(name, parseFilter(req), opts)
  const { attachment, stats, mimeType } = req.query
  if (attachment) {
    for (const d of ret.data) {
      d._attachment = await attachmentFind(name, d.id, { stats, mimeType })
    }
  }
  return ret
}

export default find
