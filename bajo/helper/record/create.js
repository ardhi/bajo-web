async function create ({ repo, req, reply, body, options = {} }) {
  const { pascalCase, getPlugin, importPkg } = this.bajo.helper
  const { merge } = await importPkg('lodash-es')
  await getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordCreate } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'repo')
  const { fields } = params
  repo = repo ?? params.repo
  body = body ?? params.body
  options.req = req
  const opts = merge({}, { fields, dataOnly: false }, options)
  return await recordCreate(pascalCase(repo), body, opts)
}

export default create
