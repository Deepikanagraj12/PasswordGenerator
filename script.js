const inputslider = document.querySelector("[inputslider]");
const displaylength = document.querySelector("[length]");
const indicator = document.querySelector("[indicator]");
const symbols ='~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const  displayPassword = document.querySelector("[displayPassword]");
const  copied = document.querySelector("[copied]")
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const copyBtn = document.querySelector("[copyBtn]");
const generateBtn = document.querySelector(".generate-btn");
const upperCase = document.querySelector("#UpperCase");
const lowerCase = document.querySelector("#LowerCase");
const number = document.querySelector("#Numbers");
const symbol = document.querySelector("#Symbols");

console.log('start');

let password = "";
let passwordLength =10;
let checkcount =0;
handleslider();
setIndicator("#f0f8ff");



function handleslider(){
    inputslider.value = passwordLength;
    displaylength.innerText = passwordLength;
}


 function setIndicator(color){
  indicator.style.backgroundColor =color ;
  
 }  

function getRndInteger (min, max){
   return Math.floor( Math.random() *(max - min )) + min; 
}

function getNumber(){
    return getRndInteger(0,9);
}

function getUppercase(){
    return String.fromCharCode(getRndInteger(65,90));
}
function getLowercase(){
    return String.fromCharCode(getRndInteger(97,121));
}



function getSymbol(){
    const index = getRndInteger(0,symbols.length);
    return symbols.charAt(index);
}



function calStrength(){

  let hasupperCase = false;
  let haslowerCase = false;
  let hasnumber = false;
  let hassymbol = false;

 if(upperCase.checked) hasupperCase = true;
 if(lowerCase.checked) haslowerCase = true;
 if(number.checked) hasnumber = true;
 if(symbol.checked) hassymbol = true;

 if (hasupperCase && haslowerCase && (hasnumber || hassymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if ((haslowerCase || hasupperCase) && (hasnumber || hassymbol) && passwordLength >= 6) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}



async function copy(){
    try{
        await navigator.clipboard.writeText(displayPassword.value);
        copied.innerText = "copied";
       }
       catch(e){
        copied.innerText = "failed";
       }
       copied.classList.add("active");
         setTimeout( () => {
            copied.classList.remove("active");
       } , 2000 );
}

function shufflePassword(array){
  for(let i=array.length-1; i>0; i--){
    const j= Math.floor(Math.random()*(i+1))

  let temp= array[i];
  array[i]= array[j];
  array[j]= temp;
  }
let str="";
array.forEach(element => {
  str += element;
});
return str;
}



function handleCheckbox(){
    allcheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkcount++;
    });

    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleslider();
    } 
}

allcheckbox.forEach((checkbox) => {
      checkbox.addEventListener('change', handleCheckbox);
 })

inputslider.addEventListener('input' , (e) => {
  passwordLength=e.target.value;
  handleslider();
})


copyBtn.addEventListener('click', () =>{
      if(passwordLength>0)
      copy();
})


generateBtn.addEventListener('click' , ()=> {
   if(checkcount<= 0) return;

   if(passwordLength < checkcount){
    passwordLength = checkcount;
    handleslider();
} 
   password="";

   let funcArr = [];

   if(upperCase.checked)
      funcArr.push(getUppercase);

  if(lowerCase.checked)
      funcArr.push(getLowercase); 

  if(number.checked)
      funcArr.push(getNumber);

  if(symbol.checked)
      funcArr.push(getSymbol);

   for( let i=0; i<funcArr.length;i++){
     password +=funcArr[i]();   
   }

   for( let i=0; i<passwordLength-funcArr.length; i++){
      let rndIndex = getRndInteger(0,funcArr.length);
      password += funcArr[rndIndex]();
   }

    password = shufflePassword(Array.from (password));
    displayPassword.value = password;
    calStrength();
});





