async function get ({ repo, req, reply, id }) {
  const { pascalCase, getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { recordGet, attachmentGet } = this.bajoDb.helper
  const { getParams } = this.bajoWeb.helper
  const params = await getParams(req, 'repo', 'id')
  const { fields } = params
  repo = repo ?? params.repo
  id = id ?? params.id
  const name = pascalCase(repo)
  const ret = await recordGet(name, id, { fields, dataOnly: false, req })
  const { attachment, stats, mimeType } = req.query
  if (attachment) ret.data._attachment = await attachmentGet(name, id, { stats, mimeType })
  return ret
}

export default get
