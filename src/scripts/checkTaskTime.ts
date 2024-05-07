export default function checkTaskTime({register_date, delivery_date}: {register_date: Date, delivery_date: Date}): string{
  let response!: string;

  response = compareDates({
    currentDate: new Date(register_date), 
    deliveryDate: new Date(delivery_date)
  })
  return response
}

function compareDates({currentDate, deliveryDate}: {currentDate: Date, deliveryDate: Date}): string{
  
  if(currentDate.getTime() > deliveryDate.getTime()){
    return "Em atraso"
  } else if(currentDate.getTime() < deliveryDate.getTime()) {
    return "Dentro do prazo"
  } 

  return ''
}