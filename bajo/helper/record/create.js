async function create ({ repo, req, reply, body, options = {} }) {
  const { pascalCase, getPlugin, importPkg } = this.bajo.helper
  const { merge } = await importPkg('lodash-es')
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordCreate, attachmentFind } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'repo')
  const { fields } = params
  repo = repo ?? params.repo
  body = body ?? params.body
  options.req = req
  const opts = merge({}, { fields, dataOnly: false }, options)
  const name = pascalCase(repo)
  const ret = await recordCreate(name, body, opts)
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentFind(name, ret.data.id, { stats, mimeType })
  return ret
}

export default create
