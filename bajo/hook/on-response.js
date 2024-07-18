const onResponse = {
  level: 5,
  handler: async function onResponse (ctx, req, reply) {
    const { log } = this.app.bajo
    let method = 'info'
    if (reply.statusCode >= 300 && reply.statusCode < 400) method = 'warn'
    else if (reply.statusCode >= 400) method = 'error'
    log[method]('> %s:%s with a %d-status took %dms', req.method, req.url, reply.statusCode,
      (reply.elapsedTime ?? 0).toFixed(3))
  }
}

export default onResponse
