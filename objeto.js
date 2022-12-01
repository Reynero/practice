const obj = {
    firstAttribute: 1,
    secondAttribute: 2,
    thirdAttribute: 3,
    m(){
        return this.firstAttribute + this.secondAttribute + this.thirdAttribute;
    },
    mm(){
        console.log("this method does nothing");
    }
}

console.log(obj.firstAttribute);
console.log(obj.secondAttribute);
console.log(obj.m());
obj.mm();
