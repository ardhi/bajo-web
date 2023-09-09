async function detect (detector = [], req, reply) {
  const { getConfig, importPkg } = this.bajo.helper
  const { redirectTo } = this.bajoWeb.helper
  const { get, map, trim, orderBy } = await importPkg('lodash-es')
  const cfg = getConfig('bajoWeb')
  const supported = get(this, 'bajoI18N.config.supportedLngs', ['en'])
  const defLang = get(getConfig('bajoI18N'), 'lng', getConfig().lang ?? 'en-US')
  let lang = null
  // by route path
  if (detector.includes('path')) {
    lang = req.params.lang
    if (lang && supported.includes(lang.split('-')[0])) {
      req.lang = lang
      req.langDetector = 'path'
      return
    }
    const length = req.url.split('/').length
    let url = req.url.replace(`/${lang}`, `/${defLang}`)
    if (length > 2) url = req.url.replace(`/${lang}/`, `/${defLang}/`)
    redirectTo(url)
    return
  }
  // by query string
  lang = null
  if (detector.includes('qs')) {
    lang = req.query[cfg.qsKey.lang]
    if (lang && supported.includes(lang.split('-')[0])) {
      req.lang = lang
      req.langDetector = 'qs'
      return
    }
  }
  // by header
  if (detector.includes('header')) {
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
    if (lang) {
      req.lang = lang
      req.langDetector = 'header'
      return
    }
  }
  req.lang = lang ?? get(getConfig('bajoI18N'), 'lng', getConfig().lang ?? 'en-US')
}

async function attachI18N (detector = [], req, reply) {
  if (!this.bajoI18N) return
  await detect.call(this, detector, req, reply)
  const i18n = this.bajoI18N.instance.cloneInstance()
  await i18n.changeLanguage(req.lang)
  req.i18n = i18n
}

export default attachI18N
