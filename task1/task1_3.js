//Binary search implementation
const binary_search = (arr, target) => {
    var left = 0,
        right = arr.length - 1;

    while (left <= right) {
        var mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return true;
        arr[mid] > target ? (right = mid - 1) : (left = mid + 1);
    }

    return false;
};

//Solving process
const solve = (arr, k) => {
    arr.sort((a, b) => {return a - b}); //Sort the input array in Asceding order

    for (let i = 0; i < arr.length; ++i) { //For each element in the array
        var target = k - arr[i]; //Find the complement element
        var clone_arr = [...arr]; 
        clone_arr.splice(i, 1); //Remove current considered element from the array
        if (binary_search(clone_arr, target)) return true; //Searching using binary search
    }

    return false;
};

const main = () => {
    //Manual Input by fixing the array elements and k value
    var input_arr = [10, 15, 3, 7, 9, 8, 7, 5, 4, 3, 2];
    var k = 25;

    console.log(solve(input_arr, k));
};

main();
