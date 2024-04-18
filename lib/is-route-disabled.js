async function isRouteDisabled (url, method, matchers = []) {
  const { importPkg } = this.bajo.helper
  const outmatch = await importPkg('outmatch')
  const { intersection } = this.bajo.helper._
  const items = []
  for (let m of matchers) {
    if (typeof m === 'string') {
      let [path, methods] = m.split(':')
      if (!methods) methods = '*'
      if (['*', 'all'].includes(methods)) methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
      else methods = methods.split(',').map(s => s.trim())
      m = { path, methods }
    }
    items.push(m)
  }
  const matcher = items.find(i => {
    const isMatch = outmatch(i.path)
    return isMatch(url)
  })
  if (!matcher) return false
  if (Array.isArray(method)) {
    const result = intersection(method, matcher.methods)
    return result.length > 0
  }
  return matcher.methods.includes(method)
}

export default isRouteDisabled
