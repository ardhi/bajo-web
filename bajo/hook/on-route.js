const onRoute = {
  level: 5,
  handler: async function (ctx, opts) {
    this.bajoWeb.routes = this.bajoWeb.routes || []
    this.bajoWeb.routes.push(opts)
  }
}

export default onRoute
