import prepCrud from '../../../lib/prep-crud.js'

async function create ({ coll, req, reply, body, options = {} }) {
  const { getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordCreate, attachmentFind } = this.bajoDb.helper
  const { name, input, opts } = prepCrud.call(this, { coll, req, body, options, args: ['coll'] })
  const ret = await recordCreate(name, input, opts)
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentFind(name, ret.data.id, { stats, mimeType })
  return ret
}

export default create
