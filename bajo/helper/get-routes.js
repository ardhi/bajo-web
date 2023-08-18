async function getRoutes (grouped, lite) {
  const { importPkg } = this.bajo.helper
  const { groupBy, orderBy, mapValues, map, pick } = await importPkg('lodash-es')
  const all = this.bajoWeb.routes
  let routes
  if (grouped) {
    const group = groupBy(orderBy(all, ['url', 'method']), 'url')
    routes = lite ? mapValues(group, (v, k) => map(v, 'method')) : group
  } else if (lite) routes = map(all, a => pick(a, ['url', 'method']))
  else routes = all
  return routes
}

export default getRoutes
