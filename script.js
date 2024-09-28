let runningTotal=0;
let buffer ="0";
let previousOperator;

const screen=document.querySelector('.screen');

function buttonClick(value){
    if (value === '*') {
        value = '*';  // Convert × to *
    } else if (value === '÷') {
        value = '/';  // Convert ÷ to /
    } else if (value === '−') {
        value = '-';  // Convert − to -
    }
    
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText=buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer='0';
            runningTotal=0;
            break;
        case '=':
        case '&equals;':
                if (previousOperator === null){
                    return;
                }
                flushOperation(parseInt(buffer));
                previousOperator=null;
                buffer=runningTotal;
                runningTotal=0;
                break;
        case '←':
        case '&larr;':
            if(buffer.length===1){
                buffer='0';
            }else{
                buffer=buffer.substring(0,buffer.length - 1);
            }
            break;
        case '+':
            case '&plus;':
                handleMath('+');
            break;
        case '-':
            case '&minus;':  // Handle minus symbol
            handleMath('-');
            break;
        case 'x':
            case '&times;': // Handle multiplication 
            handleMath('*');
            break;
        case '÷': // Handle division symbol
        case '&divide;':
            handleMath('/');
            break;
    }
}

function handleMath(symbol){
    if(buffer == '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal=== 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '-'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '*'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '/'){
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.wrapper').addEventListener('click', function(event){
        if (event.target.tagName === 'BUTTON'){
            buttonClick(event.target.textContent.trim());  // Use innerHTML.trim() to get the button content
        }
    });
}
init();