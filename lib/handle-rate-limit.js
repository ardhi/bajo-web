import rateLimit from '@fastify/rate-limit'

async function handleRateLimit (ctx, options = {}) {
  if (!options) return
  await ctx.register(rateLimit, options)
}

export default handleRateLimit
