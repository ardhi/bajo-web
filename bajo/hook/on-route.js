const onRoute = {
  level: 10,
  handler: async function (ctx, opts) {
    this.bajoWeb.routes = this.bajoWeb.routes || []
    this.bajoWeb.routes.push(opts)
  }
}

export default onRoute
