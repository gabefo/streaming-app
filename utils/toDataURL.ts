import toBase64 from './toBase64'

export default function toDataURL(str: string) {
  return `url(data:image/svg+xml;base64,${toBase64(str)})`
}
