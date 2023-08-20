async function routeHook (ctx, plugin = 'bajoWeb') {
  if (!ctx) ctx = this.bajoWeb.instance
  const { runHook } = this.bajo.helper
  const hooks = ['onRequest', 'onResponse', 'preParsing', 'preValidation', 'preHandler',
    'preSerialization', 'onSend', 'onTimeout', 'onError']
  for (const hook of hooks) {
    ctx.addHook(hook, async function (...args) {
      const context = this // encapsulated fastify scope
      await runHook(`${plugin}:${hook}`, context, ...args)
    })
  }
}

export default routeHook
