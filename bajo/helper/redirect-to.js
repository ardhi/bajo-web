import path from 'path'

function redirectTo (name, options) {
  const { error } = this.bajo.helper
  const { routePath } = this.bajoWeb.helper
  if (name.startsWith('http') || path.isAbsolute(name)) throw error('redirect', { redirect: name })
  const url = routePath(name, options)
  throw error('redirect', { redirect: url })
}

export default redirectTo
