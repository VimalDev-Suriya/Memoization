// Import stylesheets
import _ from 'lodash';
import './style.css';

function costlyFunction(color) {
  console.log(`Costly function background ${color}`);
  return `done`;
}

// ACTUAL MEMOIZATION STARTS
const fun = _.memoize(costlyFunction);
fun('red');
fun('blue');
fun('red');
fun('red');
// ACTUAL MEMOIZATION ==> RENDER ONLY 2 TIMES FOR BOTH TEST CASES
// RESULT RED,BLUE
// ACTUAL MEMOIZATION ENDS

// REACT SPECIFIC MEMOIZATION
function reactSpecificMemo() {
  const prevState = {
    color: null,
    result: null,
  };

  return (color) => {
    if (prevState.color === color) {
      return prevState.result;
    }

    prevState.color = color;
    prevState.result = costlyFunction(color);
    return `done`;
  };
}

const funClousre = reactSpecificMemo();
funClousre('red');
funClousre('blue');
funClousre('red');
funClousre('blue');
// RESULT 4 TIMES
// RED BLUE RED BLUE

funClousre('red');
funClousre('red');
funClousre('blue');
funClousre('blue');
// RESULT 2 TIMES
// RED BLUE
