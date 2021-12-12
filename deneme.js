let obj ='audi,bmw,mercedes,opel,honda,toyota,ford,fiat,bentley';
const ob2 = obj.split(',')
let indexToyota = ob2.indexOf('toyota');
console.log(ob2.splice(0,indexToyota))
// console.log(ob2.filter((item)=> item.startsWith('b')));