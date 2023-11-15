function parseFilter (req) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWeb')
  const result = {}
  for (const item of ['query', 'match', 'limit', 'page', 'sort', 'noCount', 'sort', 'bbox']) {
    result[item] = req.query[cfg.qsKey[item]]
  }
  return result
}

export default parseFilter
