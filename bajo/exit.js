export default async function () {
  const { _ } = this.bajo.helper
  await this.bajoWeb.instance.close()
}
