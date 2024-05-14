async function getUploadedFiles (reqId, fileUrl, returnDir) {
  const { getPluginDataDir, fastGlob, resolvePath } = this.bajo.helper
  const dir = `${getPluginDataDir('bajoWeb')}/upload/${reqId}`
  const result = await fastGlob(`${dir}/*`)
  if (!fileUrl) return returnDir ? { dir, files: result } : result
  const files = result.map(f => resolvePath(f, true))
  return returnDir ? { dir, files } : files
}

export default getUploadedFiles
