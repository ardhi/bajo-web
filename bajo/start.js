import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'

async function start () {
  const { importPkg, getConfig, generateId } = this.bajo.helper
  const { cloneDeep } = await importPkg('lodash-es::bajo')
  const queryString = await importPkg('query-string::bajo-extra')
  const opts = getConfig('bajoWeb')
  const optsFactory = cloneDeep(opts.factory)
  const optsServer = cloneDeep(opts.server)
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
  await instance.listen(cloneDeep(optsServer))
}

export default start