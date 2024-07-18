async function appHook () {
  const { runHook } = this.app.bajo
  const hooks = ['onReady', 'onClose', 'preClose', 'onRoute', 'onRegister']
  for (const hook of hooks) {
    this.instance.addHook(hook, async function (...args) {
      if (['onClose', 'onReady'].includes(hook)) await runHook(`${this.name}:${hook}`, ...args)
      else {
        const ctx = this // encapsulated fastify scope
        await runHook(`${this.name}:${hook}`, ctx, ...args)
      }
    })
  }
}

export default appHook
