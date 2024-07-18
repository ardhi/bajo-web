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
  const { generateId, runHook } = this.app.bajo
  const cfg = this.getConfig()
  cfg.factory.logger = this.app.bajoLogger.instance.child(
    {},
    { msgPrefix: '[bajoWeb] ' }
  )
  cfg.factory.genReqId = req => generateId()
  cfg.factory.disableRequestLogging = true

  const instance = fastify(cfg.factory)
  instance.decorateRequest('lang', null)
  instance.decorateRequest('langDetector', null)
  this.instance = instance
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
  if (cfg.printRoutes) printRoutes.call(this)
  await instance.listen(cfg.server)
}

export default start
