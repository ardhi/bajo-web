import path from 'path'

async function handleRedirect (ctx, options) {
  const { routePath } = this.bajoWeb.helper
  ctx.decorateReply('redirectTo', async function (url, options = {}) {
    if (url.startsWith('http') || path.isAbsolute(url)) return this.redirect(url)
    return this.redirect(routePath(url, options))
  })
}

export default handleRedirect
