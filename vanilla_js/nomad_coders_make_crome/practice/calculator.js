const calculator = {
  plus: function(a, b){
    return (a + b);
  },
  minus: function(a, b){
    return (a - b);
  },
  multiplcation: function(a, b){
    return (a * b);
  },
  division: function(a, b){
    return (a / b);
  }
}

const plus = calculator.plus(5, 5);
const minus = calculator.minus(10, 5);
const multiplcation = calculator.multiplcation(5, 5);
const division = calculator.division(5, 5);
console.log(`5 + 5 = ${plus}\n10 - 5 = ${minus}\n5 * 5 = ${multiplcation}\n5 / 5 = ${division}`);
