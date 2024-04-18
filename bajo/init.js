async function init () {
  const { importPkg } = this.bajo.helper
  const { isEmpty } = this.bajo.helper._
  this.bajoWeb.var = {
    isEmpty,
    queryString: await importPkg('bajoExtra:query-string')
  }
}

export default init
