import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export let deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents:  0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents:  499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents:  999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  let today = dayjs();

  let days = Number(deliveryOption.deliveryDays);

  let newDays = 0;

  

  while(days !== 0) {
    if(isWeekend(today)){
      days--;
    }
    newDays++;
    today = today.add(1, 'day');
  }

  let deliveryDate = today.add(newDays, 'days');


  /*let deliveryDate = today.add(
    deliveryOption.deliveryDays, 'days'
  );*/

  let dateString = deliveryDate.format(
    'dddd, MMMM D'
  );
  return dateString;
}

function isWeekend(date) {
  return date.day() === 0 || date.day() === 6; 
}