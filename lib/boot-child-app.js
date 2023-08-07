async function app () {
  const { eachPlugins, importModule } = this.bajo.helper
  await eachPlugins(async function ({ file }) {
    const mod = await importModule(file)
    await mod.call(this)
  }, { glob: 'child-app.js' })
}

export default app
