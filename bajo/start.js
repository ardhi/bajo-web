import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'

async function start () {
  const { importPkg, getConfig, generateId } = this.bajo.helper
  const [_, queryString] = await importPkg('lodash::bajo', 'query-string::bajo-extra')
  const opts = getConfig('bajoWeb')
  const optsFactory = _.cloneDeep(opts.factory)
  const optsServer = _.cloneDeep(opts.server)
  optsFactory.logger = this.bajoLogger.instance.child(
    {},
    { msgPrefix: '[bajoWeb] ' }
  )
  optsFactory.genReqId = req => generateId()
  optsFactory.querystringParser = str => queryString.parse(str)

  const instance = fastify(optsFactory)
  this.bajoWeb.instance = instance
  await appHook.call(this)
  await routeHook.call(this)
  await instance.listen(_.cloneDeep(optsServer))
}

export default start