async function routeHook (ns) {
  if (!ns) ns = this.name
  const ctx = this.app[ns].instance
  const { runHook } = this.app.bajo
  for (const hook of this.hookTypes) {
    ctx.addHook(hook, async function (...args) {
      const context = this // encapsulated fastify scope
      await runHook(`${ns}:${hook}`, context, ...args)
    })
  }
}

export default routeHook
