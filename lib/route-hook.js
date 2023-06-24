async function routeHook () {
  const { runHook } = this.bajo.helper
  const hooks = ['onRequest', 'onResponse', 'preParsing', 'preValidation', 'preHandler',
    'preSerialization', 'onSend', 'onTimeout', 'onError']
  for (const hook of hooks) {
    this.bajoWeb.instance.addHook(hook, async function (...args) {
      const ctx = this // encapsulated fastify scope
      runHook(`bajoWeb:${hook}`, { ctx }, ...args)
    })
  }
}

export default routeHook