const onRequest = {
  level: 5,
  handler: async function onRequest (ctx, req, reply) {
    const { log, getConfig } = this.bajo.helper
    const cfg = getConfig('bajoWeb')
    req.site = cfg.siteInfo
    let msg = '< %s:%s from IP %s'
    if (req.headers['content-length']) msg += ', content length: %s'
    log.info(msg, req.method, req.url, req.ip, req.headers['content-length'])
  }
}

export default onRequest
