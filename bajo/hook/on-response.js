async function onResponse (ctx, req, reply) {
  const { log } = this.bajo.helper
  log.info('> %s:%s with a %d-status took %dms', req.method, req.url, reply.statusCode,
    reply.getResponseTime().toFixed(3))
}

export default onResponse
