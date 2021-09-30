//Read input from console
const scanner = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

scanner.question('Please enter a random string data: ', (data) => {
    //Use regex to allow Uppercase letter-only, non-empty string without spaces
    if ((/^[A-Z]+$/.test(data)) == false){
        console.log("Please input a Uppercase letters only, non-empty string data without having spaces!");
        return scanner.close();
    }

    console.log('The string data after being encoded is: ', RLE(data)); //log result
    return scanner.close();
});

//RLE implementation
const RLE = (data) => {
    let encoded = '';
    for (let i = 0; i < data.length; ++i){
        let count = 1
        for (let j = i; j < data.length; ++j){
            if (data[j] != data[j + 1]) break;
            count++;
            ++i;
        }
        encoded += count === 1 ? data[i] : count + data[i];
    }
    return encoded;
}
