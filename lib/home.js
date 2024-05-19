async function home () {
  const { getConfig, defaultsDeep } = this.bajo.helper
  const { isString, pick } = this.bajo.helper._
  const cfg = getConfig('bajoWeb')
  if (cfg.home) {
    if (isString(cfg.home)) cfg.home = { path: cfg.home }
    await this.bajoWeb.instance.get('/', async function (req, reply) {
      if (!cfg.home.forward) return await reply.redirectTo(cfg.home.path)
      const opts = defaultsDeep(pick(req, ['params', 'query']), pick(cfg.home, ['params', 'query']))
      return await reply.forwardTo(cfg.home.path, opts)
    })
  }
}

export default home
