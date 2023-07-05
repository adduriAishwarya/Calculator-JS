# Calculator-JS


This is a simple calculator project built using HTML5 and JavaScript Canvas API to create a functional user interface. The calculator can perform basic arithmetic operations such as addition, subtraction, multiplication, and division, as well as calculate percentages. It also includes a clear button to reset the calculator, an equal button to evaluate the current expression, and a back button.

## Getting Started

To get started, simply open the `index.html` file in your web browser. The calculator should appear on the screen, and you can start using it right away.
![image](https://github.com/adduriAishwarya/Calculator-JS/assets/114749497/a9061508-dc71-439d-9192-a14211a4b88e)


## Implementation

The code represents the implementation of a calculator using the JavaScript Canvas API. Here are the key steps involved:

1. Select the canvas element and obtain its context for drawing and rendering graphics.
2. Set the width and height of the canvas to 1200 and 1800 pixels, respectively.
3. Calculate the dimensions and positions of the buttons based on the canvas's width and height.
4. Draw a calculator border using the `strokeRect()` method.
5. Create two boxes to display the results and input of the calculator and style them with a gray color.
6. Use the `updateDisplay()` function to draw the initial empty boxes.
7. Create an array called `buttons` to store the button objects.
8. Use nested loops to create the buttons, retrieving their text using the `getButtonText()` function.
9. Handle special cases for buttons "AC" and "0" to create merged button backgrounds and borders.
10. Push the button objects into the `buttons` array.
11. Draw the buttons on the canvas using the JavaScript Canvas API.

## Usage

To use the calculator, click on the buttons to enter numbers and operators. The calculator can handle multiple operations, allowing you to perform complex calculations. To clear the current calculation, click on the clear button. To evaluate the current expression, click on the equal button.

## Development

To modify or extend the calculator, you can edit the `script.js` file. This file contains all the JavaScript code that powers the calculator. Feel free to change button colors, add new operations, or modify the layout to suit your needs.


## License

MIT License

```
Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

