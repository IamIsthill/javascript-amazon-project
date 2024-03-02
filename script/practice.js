import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function practice () {

  //create a randomdate then show
  function getRandomDate(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    return dayjs(randomTimestamp);
  }

  // Example usage:
  const startDate = new Date(2020, 0, 1); // January 1, 2020
  const endDate = new Date(2020, 11, 31); // December 31, 2020
  const date = getRandomDate(startDate, endDate);

  console.log(date.format('dddd, MMMM D, YYYY'));
  console.log(isWeekend(date));



  }

function isWeekend(date) {

  if(date.format('dddd')=== 'Saturday') {
    return date.format('dddd');
  } else if(date.format('dddd')=== 'Sunday'){
    return date.format('dddd');
  } else {
    return 'Not a weekend'
  }
}