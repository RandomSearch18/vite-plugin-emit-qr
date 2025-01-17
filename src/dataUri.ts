/**
 * Converts some textual (not binary) data to a data URI
 *
 * - Encodes `#` and `%` characters so that the URI can be e.g. pasted into the browser address bar without issues
 * - Optimises for minimal result size while leaving file contents unchanged
 * - Doesn't use base64 encoding to optimise for size with textual data
 * - Doesn't specify a character set to keep the URI as short as possible
 * @param data The content of the file/data to be converted to data URI
 * @param type The MIME type of the file/data, e.g. `text/html`
 */
export function toDataUri(data: string, type: string): string {
  const encodedData = data.replaceAll("#", "%23").replaceAll("%", "%25")
  const uri = `data:${type},${encodedData}`
  return uri
}
