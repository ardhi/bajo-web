function printRoutes () {
  const { print } = this.bajo.helper
  const { each, findIndex, orderBy, isArray } = this.bajo.helper._
  let items = []
  each(this.bajoWeb.routes, r => {
    const idx = findIndex(items, { url: r.url })
    if (idx < 0) items.push({ url: r.url, methods: isArray(r.method) ? r.method : [r.method] })
    else {
      if (isArray(r.method)) items[idx].methods.push(...r.method)
      else items[idx].methods.push(r.method)
    }
  })
  items = orderBy(items, ['url'])
  print.info('Loaded routes:')
  each(items, item => {
    print.succeed(`${item.url} (${item.methods.join('|')})`)
  })
}

export default printRoutes
