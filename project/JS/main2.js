let users = ["admin"], passw = ["123"];//these have to be here so they can be exported
/*if(localStorage.getItem("name")){
    window.location.href = "search.html";
    
} here you tried to redirect the page as if you were still logged in
 but the import section makes the webpage to get bugged (import section from main.js)*/

(function(){
const butt = document.querySelector("#butt");
const inputs = document.querySelectorAll("input");
const butt2 = document.getElementById("butt2");
let j = 0, flag = false;

/*since we are using the same file for two different htmls one of the buttons wont 
render and this will cause the "butt" variable to be null, this is why we use "if"*/
if(butt){
    
    butt.addEventListener("click",()=>{
        users = localStorage.getItem("users");
        passw = localStorage.getItem("passw");
        alert(users)
        alert(passw)
        users = users?users.split(","):["admin"];//i had to convert it to an array again because localstorage stores data as a string
        passw = passw?passw.split(","):["123"];
        if(inputs[0].value !== "" && inputs[1].value !== ""){
            
            users.forEach((element)=>{
                if(element === inputs[0].value && passw[j] === inputs[1].value){
                    localStorage.setItem("name", inputs[0].value);
                    localStorage.setItem("passw2", inputs[1].value);
                    flag = true;
                    
                }
                
                j++;
            });
            
        }else{
            alert("fill all the textboxes!");
        }
    
    
        if(flag){
            
            flag = false;
            window.location.href = "search.html";
        }else{
            alert("username or password doesnt match");
            inputs[0].value = null;
            inputs[1].value = null;
        }
        j = 0;
        
    });
}


//the same here
if(butt2){
    butt2.addEventListener("click", () => {
    
        if(inputs[0].value !== "" && inputs[1].value !== "" && inputs[2].value !== ""){
            
            if(inputs[1].value === inputs[2].value){
                /*users = localStorage.getItem("users");
                passw = localStorage.getItem("passw");
                users = users.split(",");
                passw = passw.split(",");
                if you want for the localstorage to keep storing unlimited data uncomment this part,
                for the moment, your program will only store up to 2 users*/
                users.push(inputs[0].value);
                passw.push(inputs[1].value);
                localStorage.setItem("users", users);
                localStorage.setItem("passw", passw);
                alert("User account successfully created!");
                window.location.href = "index.html";
            }else{
                alert("both passwords must be the same");
            }
        }else{
            alert("fill all the textboxes!");
        }
        
    });
}


})();

export {users, passw};
