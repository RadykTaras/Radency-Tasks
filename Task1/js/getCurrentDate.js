export function getCurrentDate(){
  const today = new Date();
  let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  let currentMonthNumber = today.getMonth();
  let currentDate = (months[currentMonthNumber]+' '+today.getDate()+', '+today.getFullYear());
  return currentDate;
}