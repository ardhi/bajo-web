async function update ({ coll, req, reply, id, body, options = {} }) {
  const { pascalCase, getPlugin, importPkg, isSet } = this.bajo.helper
  const { merge } = await importPkg('lodash-es')
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordUpdate, attachmentFind } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'coll', 'id')
  let { fields } = params
  if (isSet(options.fields)) fields = options.fields
  coll = coll ?? params.coll
  body = body ?? params.body
  id = id ?? params.id ?? req.query.id
  options.req = req
  const opts = merge({}, { fields, dataOnly: false }, options)
  const name = pascalCase(coll)
  const ret = await recordUpdate(name, id, body, opts)
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentFind(name, id, { stats, mimeType })
  return ret
}

export default update
