import prepCrud from '../../../lib/prep-crud.js'

async function aggregate ({ coll, req, reply, options = {} }) {
  const { getPlugin } = this.bajo.helper
  getPlugin('bajoDb') // ensure bajoDb is loaded
  const { statAggregate } = this.bajoDb.helper
  const { parseFilter } = this.bajoWeb.helper
  const { name, opts } = prepCrud.call(this, { coll, req, options, args: ['coll'] })
  for (const item of ['group', 'aggregate']) {
    opts[item] = options[item] ?? req.params[item] ?? req.query[item]
  }
  return await statAggregate(name, parseFilter(req), opts)
}

export default aggregate
