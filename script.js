// Function managing current operation

const result = function (a, b, operator) {

    let numberA = Number(a);
    let numberB = Number(b)

    let result;
    
    switch(operator) {
        case '+' :
            result = numberA + numberB;
            break;
        case '−' :
            result = numberA - numberB;
            break;
        case '*' :
            result = numberA * numberB;
            break;
        case '/' :
            result = numberA / numberB;
            break;
    }

    let lengthResult = result.toString().length;

    if(lengthResult > 10) {
        return result.toFixed(10);
    } 
   
    return result;

}

// buttons and screen selection

const screen = document.getElementById('screen');

const btns = document.querySelectorAll('.btn');

// declarations of main values

let operatorValue;
let firstValue;
let secondValue;
let resultFirstValue; // the result will become the firstValue of the operation, if another operator is called right after the result appears on the screen

// for each button, listen on click

btns.forEach(btn => {
   

    btn.addEventListener('click', () => {


        if(btn.classList.contains('clear')) {
            screen.innerText = '0';
            screen.classList.add('cleared');

            btns.forEach(btn => {
                if(btn.classList.contains('active')) {
                    btn.classList.remove('active');
                }
            })
        }
    
        if(!btn.classList.contains('operator') && !btn.classList.contains('equal') && !btn.classList.contains('clear')) {
            
            if(screen.classList.contains('cleared') || screen.innerText == operatorValue || screen.classList.contains('active')) {

                screen.classList.remove('cleared');

                screen.innerText = '';
                screen.classList.remove('active');

            }

            let value = btn.innerText;
            
            screen.innerText += value;

            if(operatorValue == undefined) {
                
                if(firstValue == undefined) {
                    firstValue = btn.innerText;
                } else firstValue += btn.innerText;
                
            }

            if(operatorValue != undefined) {

                if(secondValue == undefined) {
                    secondValue = btn.innerText;
                } else secondValue += btn.innerText;

            }

        
        }


        if(btn.classList.contains('equal') && firstValue != undefined && secondValue != undefined && operatorValue != undefined) {

            let resultOperation = result(firstValue, secondValue, operatorValue);
            screen.innerText = resultOperation;
            

            resultFirstValue = resultOperation;

            firstValue = undefined;
            secondValue = undefined;
            operatorValue = undefined;

            screen.classList.add('active');

        }


        if(btn.classList.contains('operator')) {

            if(screen.classList.contains('active')) {
                firstValue = resultFirstValue;
                
                screen.classList.remove('active');

            }

            operatorValue = btn.innerText;
            

            screen.innerText = operatorValue;
            

        }

    })

   
})
