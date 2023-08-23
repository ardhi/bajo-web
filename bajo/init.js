async function init () {
  const { importPkg } = this.bajo.helper
  const { isEmpty } = await importPkg('lodash-es')
  this.bajoWeb.var = {
    isEmpty,
    queryString: await importPkg('bajo-extra:query-string')
  }
}

export default init
