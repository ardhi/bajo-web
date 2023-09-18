import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'
import printRoutes from '../lib/print-routes.js'
import { boot } from '../lib/app.js'
import fastifySensible from '@fastify/sensible'
import fastifyNoicon from 'fastify-no-icon'

async function start () {
  const { importPkg, getConfig, generateId, runHook } = this.bajo.helper
  const { cloneDeep } = await importPkg('lodash-es')
  const queryString = await importPkg('bajo-extra:query-string')
  const cfg = getConfig('bajoWeb')
  const optsFactory = cloneDeep(cfg.factory)
  const optsServer = cloneDeep(cfg.server)
  optsFactory.logger = this.bajoLogger.instance.child(
    {},
    { msgPrefix: '[bajoWeb] ' }
  )
  optsFactory.genReqId = req => generateId()
  optsFactory.querystringParser = str => queryString.parse(str, { parseNumbers: true, parseBooleans: true })
  optsFactory.disableRequestLogging = true

  const instance = fastify(optsFactory)
  instance.decorateRequest('lang', null)
  instance.decorateRequest('langDetector', null)
  this.bajoWeb.instance = instance
  await instance.decorateRequest('site', null)
  await runHook('bajoWeb:afterCreateContext', instance)
  await instance.register(fastifySensible)
  await instance.register(fastifyNoicon)
  await appHook.call(this)
  await routeHook.call(this)
  await boot.call(this)
  await runHook('bajoWeb:afterBootApp')
  if (cfg.printRoutes) await printRoutes.call(this)
  await instance.listen(cloneDeep(optsServer))
}

export default start
