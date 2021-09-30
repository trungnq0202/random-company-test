//Read input from console
const scanner = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

scanner.question('Please enter a random string: ', (string) => {
    //Use regex to allow letter-only, non-empty string without spaces
    if ((/^[A-Za-z]+$/.test(string)) == false){
        console.log("Please input a letter-only, non-empty string without having spaces!");
        return scanner.close();
    }

    const sort_string = string => string.split('').sort().join('');

    console.log('The string after being alphabetically sorted is: ', sort_string(string)); //log result
    return scanner.close();
});

