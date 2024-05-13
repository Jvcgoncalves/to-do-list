export default function filterStatusFormated(value: string): boolean{
  switch(value){
    case "done":
      return true
    case "overdue":
      return false
    default:
      return false
  }
}