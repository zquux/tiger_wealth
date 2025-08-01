export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  if (!year || !month || !day) return '-'
  return `${day}/${month}/${year}`
}
