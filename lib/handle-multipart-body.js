import multipart from '@fastify/multipart'
import { promisify } from 'util'
import { pipeline } from 'stream'
import path from 'path'
const pump = promisify(pipeline)

async function onFileHandler () {
  const { importPkg, getPluginDataDir } = this.bajo.helper
  const fs = await importPkg('fs-extra')
  const dir = `${getPluginDataDir('bajoWeb')}/upload`
  return async function (part) {
    const filePath = `${dir}/${this.id}/${part.fieldname}-${part.filename}`
    await fs.ensureDir(path.dirname(filePath))
    await pump(part.file, fs.createWriteStream(filePath))
  }
}

async function handleMultipartBody (ctx, options = {}) {
  const { getConfig, defaultsDeep, importPkg, isSet } = this.bajo.helper
  const { isArray, map, trim, isPlainObject } = await importPkg('lodash-es')
  const parseVar = await importPkg('dotenv-parse-variables')
  const cfg = getConfig('bajoWeb')
  const opts = defaultsDeep(options, cfg.multipart)
  const onFile = await onFileHandler.call(this)
  opts.onFile = onFile
  await ctx.register(multipart, opts)

  function normalizeValue (value) {
    if (!isSet(value)) return
    if (value === 'null') value = null
    else if (value === 'undefined') value = undefined
    else {
      const val = trim(value)
      if (['{', '['].includes(val[0])) {
        try {
          const parsed = JSON.parse(val)
          if (isPlainObject(parsed) || isArray(parsed)) value = parsed
        } catch (err) {
          value = val
        }
      } else value = parseVar({ item: value }).item
    }
    return value
  }

  ctx.addHook('preValidation', async function (req, reply) {
    if (req.isMultipart() && opts.attachFieldsToBody === true) {
      const body = Object.fromEntries(
        Object.keys(req.body || {}).map((key) => {
          let item = req.body[key]
          let value
          if (key.endsWith('[]') && !isArray(item)) item = [item]
          if (isArray(item)) {
            value = map(item, i => normalizeValue(i.value))
          } else {
            value = normalizeValue(item.value)
          }
          key = key.replace('[]', '')
          return [key, value]
        })
      )
      req.body = body
    }
  })
}

export default handleMultipartBody
