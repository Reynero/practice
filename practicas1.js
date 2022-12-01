let arr = [], average = 0;

for(let i = 0; i < 100;i++){
    let rand = Math.floor(Math.random() * 100);
    arr.push(rand);
}
console.log(arr);
console.log(arr.filter((e) => e%2 === 0));


arr.forEach((e)=>{
    average = average + e;
});

//… in front of an array will convert array to distinct variables and send them to the function
console.log(`Max: ${Math.max(...arr)}`);
console.log(`Min: ${Math.min(...arr)}`);
console.log(`Average: ${average / arr.length}`);


