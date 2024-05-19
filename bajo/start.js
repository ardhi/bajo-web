import fastify from 'fastify'
import appHook from '../lib/app-hook.js'
import routeHook from '../lib/route-hook.js'
import printRoutes from '../lib/print-routes.js'
import { boot } from '../lib/app.js'
import sensible from '@fastify/sensible'
import noIcon from 'fastify-no-icon'
import underPressure from '@fastify/under-pressure'
import handleForward from '../lib/handle-forward.js'
import handleRedirect from '../lib/handle-redirect.js'

async function start () {
  const { getConfig, generateId, runHook } = this.bajo.helper
  const { cloneDeep } = this.bajo.helper._
  const cfg = getConfig('bajoWeb')
  const optsFactory = cloneDeep(cfg.factory)
  const optsServer = cloneDeep(cfg.server)
  optsFactory.logger = this.bajoLogger.instance.child(
    {},
    { msgPrefix: '[bajoWeb] ' }
  )
  optsFactory.genReqId = req => generateId()
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
  await handleRedirect.call(this, instance)
  await handleForward.call(this, instance)
  await appHook.call(this)
  await routeHook.call(this)
  await boot.call(this)
  await runHook('bajoWeb:afterBootApp')
  if (cfg.printRoutes) printRoutes.call(this)
  await instance.listen(optsServer)
}

export default start
