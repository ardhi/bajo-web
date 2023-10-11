import hookTypes from '../bajo/helper/hook-types.js'

async function routeHook (plugin = 'bajoWeb') {
  const ctx = this[plugin].instance
  const { runHook } = this.bajo.helper
  for (const hook of hookTypes) {
    ctx.addHook(hook, async function (...args) {
      const context = this // encapsulated fastify scope
      await runHook(`${plugin}:${hook}`, context, ...args)
    })
  }
}

export default routeHook
