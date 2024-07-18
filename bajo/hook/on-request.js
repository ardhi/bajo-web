const onRequest = {
  level: 5,
  handler: async function onRequest (ctx, req, reply) {
    const { log, getConfig } = this.app.bajo
    const { getIp } = this.helper
    const cfg = getConfig('bajoWeb')
    req.site = cfg.siteInfo
    let msg = '< %s:%s from IP %s'
    if (req.headers['content-length']) msg += ', content length: %s'
    this.log.info(msg, req.method, req.url, getIp(req), req.headers['content-length'])
    if (Object.keys(cfg.paramsCharMap).length === 0) return
    for (const key in req.params) {
      let val = req.params[key]
      if (typeof val !== 'string') continue
      for (const char in cfg.paramsCharMap) {
        val = val.replaceAll(char, cfg.paramsCharMap[char])
      }
      req.params[key] = val
    }
  }
}

export default onRequest
