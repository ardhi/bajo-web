import rateLimit from '@fastify/rate-limit'

async function handleRateLimit (ctx, options = {}) {
  const { cloneDeep } = this.bajo.helper._
  if (!options) return
  await ctx.register(rateLimit, cloneDeep(options))
}

export default handleRateLimit
