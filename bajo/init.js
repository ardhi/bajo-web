async function init () {
  if (this.bajoWeb.config.home === '/') this.bajoWeb.config.home = false
}

export default init
