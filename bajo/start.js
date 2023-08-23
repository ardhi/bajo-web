import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'
import bootApp from '../lib/boot-app.js'
import fastifySensible from '@fastify/sensible'

async function start () {
  const { importPkg, getConfig, generateId, runHook } = this.bajo.helper
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
  optsFactory.disableRequestLogging = true

  const instance = fastify(optsFactory)
  this.bajoWeb.instance = instance
  await runHook('bajoWeb:afterCreateContext', instance)
  await instance.register(fastifySensible)
  await appHook.call(this)
  await routeHook.call(this)
  await bootApp.call(this)
  await runHook('bajoWeb:afterBootApp')
  await instance.listen(cloneDeep(optsServer))
}

export default start
