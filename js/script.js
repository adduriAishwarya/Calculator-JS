const canvas = document.getElementById('calculator');
const ctx = canvas.getContext('2d');

const buttonWidth = 100;
const buttonHeight = 100;
const buttonMargin = 1;
const displayBoxMargin = 0; 

// Set new canvas size
canvas.width = 1200;
canvas.height = 1800;

// Calculate starting x and y positions
const xStart = (canvas.width - (buttonWidth + buttonMargin) * 5)/2;
const yStart = (canvas.height - (buttonHeight + buttonMargin) * 5) / 2;

// Draw calculator border
ctx.strokeRect(xStart - buttonMargin, yStart + buttonMargin, buttonWidth * 5 + buttonMargin * 6, buttonHeight * 7 + buttonMargin * 6);
ctx.fillStyle = 'black';
ctx.fillRect(xStart - buttonMargin, yStart + buttonMargin, buttonWidth * 5 + buttonMargin * 6, buttonHeight * 7 + buttonMargin * 6);
const box1 = {
  text: undefined, 
  x: xStart,
  y: yStart + 2 * buttonMargin,
  width: 5 * buttonWidth + 4 * buttonMargin,
  height: buttonHeight,
  color: 'lightblue',
};

const box2 = {
  text: undefined, 
  x: xStart,
  y: yStart +  buttonHeight,
  width: 5 * buttonWidth + 4 * buttonMargin,
  height: buttonHeight,
  color: 'lightblue',
};

// draw boxes
function drawBox(box) {
  ctx.fillStyle = 'gray';
  ctx.fillRect(box.x, box.y, box.width, box.height);
  if (box.text !== undefined) {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    const textWidth = ctx.measureText(box.text).width; // get the width of the text
    const margin = 10; // set the margin value
    ctx.fillText(
      box.text,
      box.x + box.width - margin - textWidth, // fill the text on the right side of the box with a margin of 10
      box.y + box.height - margin // leave a margin of 10px at the bottom of the box
    );
  }
}

box1.text=""; 
box2.text = ""; 

function updateDisplay(box1,box2)
{
  drawBox(box1); 
  drawBox(box2); 
}

updateDisplay(box1,box2); 

//creating a buttons array
const buttons = [];

// Draw numbers and operators on calculator
for (let i = 0; i < 5; i++) {
  for (let j = 2; j < 7; j++) {
    // Calculate button x and y position
    const x = xStart + (buttonWidth + buttonMargin) * i;
    const y = yStart + (buttonHeight + buttonMargin) * j;
    if((j-2==0 || j-2==4) && i==1)
    {
      continue; 
    }
    if((j-2==0 || j-2==4)&& i==2)
    {
      continue; 
    }

    if (getButtonText(i, j-2) === 'AC') {
      // Draw merged button background
      ctx.fillStyle = 'gray';
      ctx.fillRect(x, y, (buttonWidth + buttonMargin) * 3 - buttonMargin, buttonHeight);

      // Draw merged button border
      ctx.strokeRect(x, y, (buttonWidth + buttonMargin) * 3 - buttonMargin, buttonHeight);

      // Draw merged button text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('AC', x + ((buttonWidth + buttonMargin) * 3 - buttonMargin) / 2, y + buttonHeight / 2);

      // Skip the next two button spaces
      //i += 1;
      // Create button object and push to buttons array
          const button = {
            x: x,
            y: y,
            width: buttonWidth,
            height: buttonHeight,
            text: getButtonText(i, j - 2)
          };
          
          buttons.push(button);
    } 
    else if(getButtonText(i, j-2) === '0')
    {
      // Draw merged button background
      ctx.fillStyle = 'gray';
      ctx.fillRect(x, y, (buttonWidth + buttonMargin) * 3 - buttonMargin, buttonHeight);

      // Draw merged button border
      ctx.strokeRect(x, y, (buttonWidth + buttonMargin) * 3 - buttonMargin, buttonHeight);

      // Draw merged button text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial';
      ctx.fillText('0', x + ((buttonWidth + buttonMargin) * 3 - buttonMargin) / 2, y + buttonHeight / 2);

            // Create button object and push to buttons array
            const button = {
              x: x,
              y: y,
              width: buttonWidth,
              height: buttonHeight,
              text: getButtonText(i, j - 2)
            };
            
            buttons.push(button);
    }
      else {
      // Draw button background
      if(i==4)
      {
        ctx.fillStyle = 'orange';
      ctx.fillRect(x, y, buttonWidth, buttonHeight);

      }
      else{
        ctx.fillStyle = 'gray';
      ctx.fillRect(x, y, buttonWidth, buttonHeight);
      }
      

      // Draw button border
      ctx.strokeRect(x, y, buttonWidth, buttonHeight);

      // Draw button text
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial';
      const buttonText = getButtonText(i, j-2);
      ctx.fillText(buttonText, x + buttonWidth / 2, y + buttonHeight / 2);
            // Create button object and push to buttons array
          const button = {
            x: x,
            y: y,
            width: buttonWidth,
            height: buttonHeight,
            text: getButtonText(i, j - 2) 
          };
          
          buttons.push(button);
    }
    
  }
}

// Add a click event listener to the canvas element
canvas.addEventListener('click', function(event) {
  // Get the mouse position relative to the canvas element
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Loop through each button in the buttons array
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];

    // Check if the mouse position is inside the button
    if (mouseX >= button.x && mouseX <= button.x + button.width &&
        mouseY >= button.y && mouseY <= button.y + button.height) {
      
      if(button.text=='BACK')
      {
        box2.text = box2.text.slice(0, -1); 
        updateDisplay(box1,box2);
        return;
      }
      else if(button.text=='AC')
      {
        box1.text=''; 
        box2.text=''; 
        updateDisplay(box1,box2);
        return;
      }
      else if(button.text=='=')
      {
        //console.log("we will evaluate"); 
        box1.text = compute(box2.text);
        if(box1.text!='')
        {
          box2.text='';
        }
        updateDisplay(box1, box2);
        return;
      }
      else
      {
        box2.text += button.text;
        updateDisplay(box1,box2);
        return;
      }
    }
  }
});


function getButtonText(i, j) {
  if (j === 0) {
    switch (i) {
      case 0:
      case 1:
      case 2:
        return 'AC';
      case 3:
        return '%';
      case 4:
        return '/';
    }
  } else if (j === 1) {
    switch (i) {
      case 0:
        return '(';
      case 1:
        return '7';
      case 2:
        return '8';
      case 3:
        return '9';
      case 4:
        return 'x';
    }
  } else if (j === 2) {
    switch (i) {
      case 0:
        return ')';
      case 1:
        return '4';
      case 2:
        return '5';
      case 3:
        return '6';
      case 4:
        return '-';
    }
  } else if (j === 3) {
    switch (i) {
      case 0:
        return 'BACK';
      case 1:
        return '1';
      case 2:
        return '2';
      case 3:
        return '3';
      case 4:
        return '+';
    }
  } else if (j === 4) {
    switch (i) {
      case 0:
      case 1:
      case 2:
        return '0';
      case 3:
        return '.';
      case 4:
        return '=';
    }
  }
}

// function compute(str) {
//   let num = 0;
//   let decimalPlaces = 0;
//   let stack = [];

//   for (let i = 0; i < str.length; i++) {
//     let char = str[i];

//     if (!isNaN(char)) {
//       if (decimalPlaces > 0) {
//         num += parseInt(char) / Math.pow(10, decimalPlaces++);
//       } else {
//         num = num * 10 + parseInt(char);
//       }
//     } else if (char === '.') {
//       decimalPlaces = 1;
//     } else if (char === '(') {
//       let j = i + 1;
//       let openParens = 1;
//       while (j < str.length && openParens > 0) {
//         if (str[j] === '(') {
//           openParens++;
//         } else if (str[j] === ')') {
//           openParens--;
//         }
//         j++;
//       }
//       if (openParens !== 0) {
//         alert('Mismatched parentheses');
//         return '';
//       }
//       num = compute(str.slice(i + 1, j - 1));
//       i = j - 1;
//     } else if (isNaN(char) && char !== ' ') {
//       let new_op = char;
//       while (stack.length > 0 && operators[new_op].precedence <= operators[stack[stack.length-1]].precedence) {
//         let prev_op = stack.pop();
//         let prev_num = stack.pop();
//         if (prev_op === '/' && num === 0) {
//           alert('Division by zero');
//           return '';
//         }
//         if (prev_op === 'x') {
//           num *= prev_num;
//         } else if (prev_op === '/') {
//           num = prev_num / num;
//         } else if (prev_op === '+') {
//           num = prev_num + num;
//         } else if (prev_op === '-') {
//           num = prev_num - num;
//         } else if (prev_op === '%') {
//           num = prev_num % num;
//         }
//       }
//       stack.push(num);
//       stack.push(new_op);
//       num = 0;
//       decimalPlaces = 0;
//     }
//   }

//   while (stack.length > 0) {
//     let prev_op = stack.pop();
//     let prev_num = stack.pop();
//     if (prev_op === '/' && num === 0) {
//       alert('Division by zero');
//       return '';
//     }
//     if (prev_op === 'x') {
//       num *= prev_num;
//     } else if (prev_op === '/') {
//       num = prev_num / num;
//     } else if (prev_op === '+') {
//       num = prev_num + num;
//     } else if (prev_op === '-') {
//       num = prev_num - num;
//     } else if (prev_op === '%') {
//       num = prev_num % num;
//     }
//   }
//   console.log(num);
//   return num;
// }


function compute(str) {
  let num = 0;
  let decimalPlaces = 0;
  let stack = [];
  const operators = {
    '+': { precedence: 1, operation: (a, b) => a + b },
    '-': { precedence: 1, operation: (a, b) => a - b },
    'x': { precedence: 2, operation: (a, b) => a * b },
    '/': { precedence: 2, operation: (a, b) => a / b },
    '%': { precedence: 2, operation: (a, b) => a * (b / 100) },
  };

  for (let i = 0; i < str.length; i++) {
    let char = str[i];

    if (!isNaN(char)) {
      if (decimalPlaces > 0) {
        num += parseInt(char) / Math.pow(10, decimalPlaces++);
      } else {
        num = num * 10 + parseInt(char);
      }
    } else if (char === '.') {
      decimalPlaces = 1;
    } else if (char === '(') {
      let j = i + 1;
      let openParens = 1;
      while (j < str.length && openParens > 0) {
        if (str[j] === '(') {
          openParens++;
        } else if (str[j] === ')') {
          openParens--;
        }
        j++;
      }
      if (openParens !== 0) {
        alert('Mismatched parentheses');
        return NaN;
      }
      num = compute(str.slice(i + 1, j - 1));
      i = j - 1;
    } else if (isNaN(char) && char !== ' ') {
      let new_op = char;
      while (stack.length > 0 && operators[new_op].precedence <= operators[stack[stack.length-1]].precedence) {
        let prev_op = stack.pop();
        let prev_num = stack.pop();
        if (prev_op === '/' && num === 0) {
          alert('Division by zero');
          return NaN;
        }
        if (prev_op === 'x') {
          num *= prev_num;
        } else if (prev_op === '/') {
          num = prev_num / num;
        } else if (prev_op === '+') {
          num = prev_num + num;
        } else if (prev_op === '-') {
          num = prev_num - num;
        } else if (prev_op === '%') {
          num = prev_num * (num / 100);
        }
      }
      stack.push(num);
      stack.push(new_op);
      num = 0;
      decimalPlaces = 0;
    }
  }

  while (stack.length > 0) {
    let prev_op = stack.pop();
    let prev_num = stack.pop();
    if (prev_op === '/' && num === 0) {
      alert('Division by zero');
      return NaN;
    }
    if (prev_op === 'x') {
      num *= prev_num;
    } else if (prev_op === '/') {
      num = prev_num / num;
    } else if (prev_op === '+') {
      num = prev_num + num;
    } else if (prev_op === '-') {
      num = prev_num - num;
    } else if (prev_op === '%') {
      num = prev_num * (num / 100);
    }

    console.log(num);
     return num;
  }
}
 









// Center the calculator on the screen
canvas.style.position = 'absolute';
canvas.style.left = '50%';
canvas.style.top = '50%';
canvas.style.transform = 'translate(-50%, -50%)';
