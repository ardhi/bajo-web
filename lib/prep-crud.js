function prepCrud ({ coll, body, id, req, options, args }) {
  const { pascalCase, getConfig } = this.bajo.helper
  const { getParams } = this.bajoWeb.helper
  const { cloneDeep, get } = this.bajo.helper._
  const cfg = getConfig('bajoWeb')
  const opts = cloneDeep(options)
  const params = getParams(req, ...args)
  for (const k of ['count', 'fields']) {
    opts[k] = opts[k] ?? params[k]
  }
  opts.dataOnly = get(cfg, 'dbColl.dataOnly', false)
  opts.req = req
  const recId = id ?? params.id ?? req.query.id
  const name = pascalCase(coll ?? params.coll)
  const input = body ?? params.body
  return { name, recId, input, opts }
}

export default prepCrud
