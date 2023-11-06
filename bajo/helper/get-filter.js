async function getFilter (req) {
  const { getConfig, isSet } = this.bajo.helper
  const { buildQuery } = this.bajoDb.helper
  const cfg = getConfig('bajoWeb')
  const query = await buildQuery(req.query[cfg.qsKey.query])
  let bbox
  if (req.query[cfg.qsKey.bbox]) {
    const [minx, miny, maxx, maxy] = req.query[cfg.qsKey.bbox].split(',').map(b => parseFloat(b) || null)
    const valid = isSet(minx) && isSet(miny) && isSet(maxx) && isSet(maxy)
    if (valid) bbox = [minx, miny, maxx, maxy]
  }
  const limit = req.query[cfg.qsKey.limit]
  const page = req.query[cfg.qsKey.page]
  const sort = req.query[cfg.qsKey.sort]
  return { query, limit, page, sort, bbox }
}

export default getFilter
