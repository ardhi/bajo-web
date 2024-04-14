import prepCrud from '../../../lib/prep-crud.js'

async function get ({ coll, req, reply, id, options = {} }) {
  const { getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { parseFilter } = this.bajoWeb.helper
  const { recordGet, attachmentFind } = this.bajoDb.helper
  const { name, recId, opts } = await prepCrud.call(this, { coll, req, id, options, args: ['coll', 'id'] })
  opts.filter = parseFilter(req)
  const ret = await recordGet(name, recId, opts)
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentFind(name, id, { stats, mimeType })
  return ret
}

export default get
