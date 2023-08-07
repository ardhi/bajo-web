async function appHook () {
  const { runHook } = this.bajo.helper
  const hooks = ['onReady', 'onClose', 'preClose', 'onRoute', 'onRegister']
  for (const hook of hooks) {
    this.bajoWeb.instance.addHook(hook, async function (...args) {
      if (['onClose', 'onReady'].includes(hook)) await runHook(`bajoWeb:${hook}`, ...args)
      else {
        const ctx = this // encapsulated fastify scope
        await runHook(`bajoWeb:${hook}`, ctx, ...args)
      }
    })
  }
}

export default appHook
