function getParams (req, ...items) {
  const { getConfig } = this.bajo.helper
  const { map, trim, get, each } = this.bajo.helper._
  const cfg = getConfig('bajoWeb')
  let fields
  req.query = req.query ?? {}
  req.params = req.params ?? {}
  if (req.query.fields) fields = map((req.query.fields ?? '').split(','), i => trim(i))
  const params = {
    fields,
    count: get(cfg, 'dbColl.count', false),
    body: req.body
  }
  each(items, i => {
    params[i] = req.params[i]
  })
  return params
}

export default getParams
