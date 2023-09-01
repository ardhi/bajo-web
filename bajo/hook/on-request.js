const onRequest = {
  level: 10,
  handler: async function onRequest (ctx, req, reply) {
    const { log } = this.bajo.helper
    let msg = '< %s:%s from IP %s'
    if (req.headers['content-length']) msg += ', content length: %s'
    log.info(msg, req.method, req.url, req.ip, req.headers['content-length'])
  }
}

export default onRequest
