async function error (ctx, extHandler) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajo')
  const me = this
  ctx.setErrorHandler(async function (err, req, reply) {
    if (err.redirect) {
      reply.redirect(err.redirect)
      return
    }
    if (err.print) {
      reply.send(err.print)
      return
    }
    if (cfg.log.level === 'trace' && !['notfound', 'redirect'].includes(err.message)) console.log(err)
    if (extHandler) {
      return await extHandler.call(me, this, err, req, reply)
    }
    if (err.message === 'notfound' || err.statusCode === 404) {
      reply.code(err.statusCode).send('')
      return
    }
    reply.code(err.statusCode ?? 500)
  })
}

export default error
