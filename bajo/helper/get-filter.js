async function getFilter (req) {
  const { getConfig } = this.bajo.helper
  const { buildQuery } = this.bajoDb.helper
  const cfg = getConfig('bajoWeb')
  const query = await buildQuery(req.query[cfg.qsKey.query])
  const limit = req.query[cfg.qsKey.limit]
  const page = req.query[cfg.qsKey.page]
  const sort = req.query[cfg.qsKey.sort]
  return { query, limit, page, sort }
}

export default getFilter
