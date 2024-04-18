import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'
import printRoutes from '../lib/print-routes.js'
import { boot } from '../lib/app.js'
import sensible from '@fastify/sensible'
import noIcon from 'fastify-no-icon'
import underPressure from '@fastify/under-pressure'

async function start () {
  const { importPkg, getConfig, generateId, runHook } = this.bajo.helper
  const { cloneDeep } = this.bajo.helper._
  const queryString = await importPkg('bajoExtra:query-string')
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
  await instance.register(sensible)
  if (cfg.underPressure) await instance.register(underPressure)
  if (cfg.noIcon) await instance.register(noIcon)
  await appHook.call(this)
  await routeHook.call(this)
  await boot.call(this)
  await runHook('bajoWeb:afterBootApp')
  if (cfg.printRoutes) printRoutes.call(this)
  await instance.listen(cloneDeep(optsServer))
}

export default start
