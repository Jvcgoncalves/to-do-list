export default function formatDate({date}: {date: string | Date}): string{
  const dateObject = new Date(date)
  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()
  return `${day}/${month}/${year}`
}