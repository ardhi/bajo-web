async function error (ctx, extHandler) {
  const { getConfig } = this.bajo.helper
  const cfg = getConfig('bajo')
  ctx.setErrorHandler(async function (err, req, reply) {
    if (err.redirect) {
      reply.redirect(err.redirect)
      return
    }
    if (err.print) {
      reply.send(err.print)
      return
    }
    reply.code(err.statusCode ?? 500)
    if (cfg.log.level === 'trace') console.log(err)
    if (extHandler) await extHandler.call(this, err, req, reply)
  })
}

export default error
