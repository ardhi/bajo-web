import replyFrom from '@fastify/reply-from'

async function handleForward (ctx) {
  const { getConfig } = this.bajo.helper
  const { routePath } = this.bajoWeb.helper
  const cfg = getConfig('bajoWeb')

  function rewriteHeaders (headers, req) {
    return {
      ...headers,
      'X-Fwd-To': true
    }
  }

  await ctx.register(replyFrom, {
    base: `http://${cfg.server.host}:${cfg.server.port}`,
    disableRequestLogging: false
  })

  await ctx.decorateReply('forwardTo', async function (url, options = {}) {
    if (url.startsWith('http')) return await this.redirectTo(url)
    return this.from(routePath(url, options), {
      rewriteHeaders
    })
  })
}

export default handleForward
