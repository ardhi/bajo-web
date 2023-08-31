const onRequest = {
  level: 10,
  handler: async function onRequest (ctx, req, reply) {
    const { log, getConfig, importPkg } = this.bajo.helper
    const { get, map, trim, orderBy } = await importPkg('lodash-es')
    const cfg = getConfig('bajoWeb')
    let msg = '< %s:%s from IP %s'
    if (req.headers['content-length']) msg += ', content length: %s'
    const supported = get(this, 'bajoI18N.config.supportedLngs', ['en'])
    let lang = req.query[cfg.qsKey.lang]
    if (lang && supported.includes(lang.split('-')[0])) {
      req.lang = lang
    } else {
      lang = null
      const accepteds = orderBy(map((req.headers['accept-language'] || '').split(','), a => {
        const [name, qty] = trim(a || '').split(';').map(i => trim(i))
        return { name, qty: parseFloat((qty || '').split('=')[1]) || 1 }
      }), ['qty'], ['desc'])
      for (const a of accepteds) {
        if (supported.includes(a.name.split('-')[0])) {
          lang = a.name
          break
        }
      }
      if (lang) req.lang = lang
    }
    if (!lang) req.lang = get(getConfig('bajoI18N'), 'lng', getConfig().lang ?? 'en-US')
    log.info(msg, req.method, req.url, req.ip, req.headers['content-length'])
  }
}

export default onRequest
