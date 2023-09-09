function notFound (name, options) {
  const { error } = this.bajo.helper
  throw error('notfound', { path: name })
}

export default notFound
