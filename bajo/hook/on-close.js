async function onClose () {
  const { log } = this.app.bajo
  this.log.info('Server is closed')
}

export default onClose
