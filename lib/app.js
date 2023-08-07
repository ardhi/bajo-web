async function app () {
  const { eachPlugins } = this.bajo.helper

  await eachPlugins(async function ({ file }) {
    console.log(file)
  }, { glob: 'app.js' })
}

export default app
