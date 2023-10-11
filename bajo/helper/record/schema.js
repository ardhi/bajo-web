async function schema ({ repo, req }) {
  const { getPlugin } = this.bajo.helper
  const { getSchema } = this.bajoDb.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const schema = await getSchema(repo ?? req.params.repo)
  return schema
}

export default schema
