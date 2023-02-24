export default function getCountryCode() {
  return Intl.DateTimeFormat().resolvedOptions().locale.slice(3)
}
