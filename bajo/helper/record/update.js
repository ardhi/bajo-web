async function update ({ repo, req, reply, id, body, options = {} }) {
  const { pascalCase, getPlugin, importPkg } = this.bajo.helper
  const { merge } = await importPkg('lodash-es')
  await getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordUpdate } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'repo', 'id')
  const { fields } = params
  repo = repo ?? params.repo
  body = body ?? params.body
  id = id ?? params.id
  options.req = req
  const opts = merge({}, { fields, dataOnly: false }, options)
  return await recordUpdate(pascalCase(repo), id, body, opts)
}

export default update
