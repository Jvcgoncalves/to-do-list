export default function checkTaskTime({ delivery_date}: {register_date: string, delivery_date: string}): string{
  let response!: string;
  const currentDateOnDayMonthYearArray = getCurrentDate()
  const deliveryDateOnDayMonthYearArray = delivery_date.split('/').map(number => +number)

  response = compareDates({
    currentDateArray: currentDateOnDayMonthYearArray, 
    deliveryDateArray: deliveryDateOnDayMonthYearArray
  })
  return response
}

function compareDates({currentDateArray, deliveryDateArray}: {currentDateArray: number[], deliveryDateArray: number[]}): string{
  
  const [currentDay, currentMonth, currentYear]: number[] = currentDateArray
  const [deliveryDay, deliveryMonth, deliveryYear]: number[] = deliveryDateArray
  if(currentYear < deliveryYear){
    return "Dentro do prazo"
  } else if(currentYear > deliveryYear){
    return 'Em atraso'
  } else if(currentMonth < deliveryMonth){
    return "Dentro do prazo"
  } else if(currentMonth > deliveryMonth){
    return 'Em atraso'
  } else if(currentDay > deliveryDay){
    return 'Em atraso'
  } else if(currentDay < deliveryDay){
    return "Dentro do prazo"
  } else if(currentDay === deliveryDay){
    return 'Último dia'
  }

  return ''
}

function getCurrentDate(): number[]{
  const date = new Date()
  const day = date.getDate()
  const month = (date.getMonth() + 1)
  const year = date.getFullYear()

  return [ day, month, year ]
}