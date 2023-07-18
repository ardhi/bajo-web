async function onClose () {
  const { log } = this.bajo.helper
  log.info('Server is closed')
}

export default onClose
