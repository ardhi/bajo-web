import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'
import bootChildApp from '../lib/boot-child-app.js'

async function start () {
  const { importPkg, getConfig, generateId } = this.bajo.helper
  const { cloneDeep } = await importPkg('lodash-es')
  const queryString = await importPkg('bajo-extra:query-string')
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
  await bootChildApp.call(this)
  await instance.listen(cloneDeep(optsServer))
}

export default start
