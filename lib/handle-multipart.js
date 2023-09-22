import multipart from '@fastify/multipart'
import { promisify } from 'util'
import { pipeline } from 'stream'
const pump = promisify(pipeline)

async function onFileHandler () {
  const { importPkg, getConfig } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const cfg = getConfig()
  const dir = `${cfg.dir.data}/plugins/bajoWeb/upload/${this.id}`
  fs.ensureDirSync(dir)
  return async function (part) {
    const path = `${dir}/${part.fieldname}-${part.filename}`
    await pump(part.file, fs.createWriteStream(path))
  }
}

async function handleMultipart (ctx, options = {}) {
  const { getConfig, defaultsDeep } = this.bajo.helper
  const cfg = getConfig('bajoWeb')
  const opts = defaultsDeep(options, cfg.multipart)
  const onFile = await onFileHandler.call(this)
  opts.onFile = onFile
  await ctx.register(multipart, opts)
}

export default handleMultipart
