async function update ({ repo, req, reply, id, body, options = {} }) {
  const { pascalCase, getPlugin, importPkg } = this.bajo.helper
  const { merge } = await importPkg('lodash-es')
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordUpdate, attachmentFind } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'repo', 'id')
  const { fields } = params
  repo = repo ?? params.repo
  body = body ?? params.body
  id = id ?? params.id
  options.req = req
  const opts = merge({}, { fields, dataOnly: false }, options)
  const name = pascalCase(repo)
  const ret = await recordUpdate(name, id, body, opts)
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentFind(name, id, { stats, mimeType })
  return ret
}

export default update
