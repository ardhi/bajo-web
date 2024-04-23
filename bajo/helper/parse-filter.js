function parseFilter (req) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajoWeb')
  const result = {}
  const items = Object.keys(cfg.qsKey)
  for (const item of items) {
    result[item] = req.query[cfg.qsKey[item]]
  }
  return result
}

export default parseFilter
