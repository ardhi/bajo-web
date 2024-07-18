const onRoute = {
  level: 5,
  handler: async function (ctx, opts) {
    this.routes = this.routes || []
    this.routes.push(opts)
  }
}

export default onRoute
