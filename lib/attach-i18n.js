async function attachI18N (ctx, req, reply) {
  if (!req.lang || !this.bajoI18N) return
  const i18n = this.bajoI18N.instance.cloneInstance()
  await i18n.changeLanguage(req.lang)
  req.i18n = i18n
}

export default attachI18N
