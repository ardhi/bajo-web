async function getCountryBbox (item) {
  item = item + ''
  if (item.includes(',')) return
  if (!this.bajoCommonDb) return
  const { error } = this.bajo.helper
  const { recordGet } = this.bajoDb.helper
  const country = await recordGet('CdbCountry', item, { thrownNotFound: false })
  if (country) return country.bbox
  throw error('Invalid bbox \'%s\'', item, { statusCode: 400 })
}

async function getFilter (req) {
  const { getConfig, isSet, error } = this.bajo.helper
  const { buildQuery } = this.bajoDb.helper
  const cfg = getConfig('bajoWeb')
  const query = await buildQuery(req.query[cfg.qsKey.query])
  const qbbox = req.query[cfg.qsKey.bbox]
  let bbox
  if (qbbox) {
    const cbbox = await getCountryBbox.call(this, qbbox)
    if (cbbox) bbox = cbbox
    else {
      const [minx, miny, maxx, maxy] = qbbox.split(',').map(b => parseFloat(b) || null)
      const valid = isSet(minx) && isSet(miny) && isSet(maxx) && isSet(maxy)
      if (valid) bbox = [minx, miny, maxx, maxy]
      else throw error('Invalid bbox \'%s\'', qbbox)
    }
  }
  const limit = req.query[cfg.qsKey.limit]
  const page = req.query[cfg.qsKey.page]
  const sort = req.query[cfg.qsKey.sort]
  const noCount = req.query[cfg.qsKey.noCount]
  return { query, limit, page, sort, bbox, noCount }
}

export default getFilter
