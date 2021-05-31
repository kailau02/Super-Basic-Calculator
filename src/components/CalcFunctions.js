export function cleanText(str){ // Remove any characters from equation line that are not available with buttons
    return Array.from(str).map(char => {
        if("1234567890.+-x÷()".includes(char)){
            return char;
        }
        else if(char === "*") return "x";
        else if(char === "/") return "÷";
        else if(char === "[") return "(";
        else if(char === "]") return ")";
        else return "";
    }).join('');
}

function jsonify(line){ // Turn equation line into multi-dimensional array
    let tmpLine = String(line).replaceAll('(', '[').replaceAll(')', ']'); // Make sure line is treated as a string

    // Add quotes and commas around operators since they must be strings during json.parse()
    for(let i = 0; i < tmpLine.length; i++){
        if('+-x÷'.includes(tmpLine[i])){
            tmpLine = tmpLine.slice(0, i+1) + '",' + tmpLine.slice(i+1);
            tmpLine = tmpLine.slice(0, i) + ',"' + tmpLine.slice(i);
            i += 4;
        }
    }
    tmpLine = '[' + tmpLine + ']'; // Set all items into array
    tmpLine = tmpLine.replaceAll('[,"-",', '[-'); // minus leading number becomes negative number
    tmpLine = tmpLine.replaceAll('-[', '-1,"x",['); // negative outside brackets becomes -1 times whatever is in the brackets

    // parse tmpLine into json format
    const arr = JSON.parse(tmpLine);
    return arr;

}

function calculate(value){ // Perform recursive order of operations calculation on equation array
    // first loop P(arenthesis)
    value.forEach((e, i) => {
        //if element is object(array), calculate its value
        if(typeof e === 'object'){
            value[i] = calculate(e);
        }
    })

    // apply negative sign
    if(value.length > 2 && value[0] === '-'){
        value[0] = -value[1];
        value.slice(1,1);
    }

    // second loop M
    for(let i = 0; i < value.length; i++){
        const e = value[i];
        // if element is 'x' do multiplication
        if(e === 'x'){

            const product = value[i-1] * value[i+1];
            value = [...value.slice(0, i-1), product, ...value.slice(i+2)];
            i-=1;
        }
    }
    // third loop D
    for(let i = 0; i < value.length; i++){
        const e = value[i];
        // if element is '÷' do division
        if(e === '÷'){
            const quotient = value[i-1] / value[i+1];
            value = [...value.slice(0, i-1), quotient, ...value.slice(i+2)];
            i-=1;
        }
    }
    // fourth loop AS
    for(let i = 0; i < value.length; i++){
        const e = value[i];
        // if element is '+' do addition
        if(e === '+'){
            const sum = value[i-1] + value[i+1];
            value = [...value.slice(0, i-1), sum, ...value.slice(i+2)];
            i-=1;
        }
        // if element is '-' do subtraction
        if(e === '-'){
            const difference = value[i-1] - value[i+1];
            value = [...value.slice(0, i-1), difference, ...value.slice(i+2)];
            i-=1;
        }
    }
    if(value.length === 1){
        value = value[0];
    }
    // If value ends as a string, there was an error in calculation. Return null
    if(typeof value === 'string'){
        return null;
    }
    return value;
}

export function tryEquals(line){
    try{
        const arr = jsonify(line); // Turn equation into json
        const result = calculate(arr);
        return result;
    }
    catch{ // If syntax error is present in calculation line, return null as error
        return null
    }
}