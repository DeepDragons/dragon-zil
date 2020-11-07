export function toLocaleString(value) {
  if (isNaN(value)) {
    return 0
  }

  return Number(value).toLocaleString()
}

export default toLocaleString
