function Generate(){
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*(_+", length = Math.floor(Math.random()*8)+16, 
        password="", i=0, n = chars.length;
    for(i; i < length; i++){
        password+= chars.charAt(Math.floor(Math.random()*n));
    }
    document.getElementById("passwordResult").innerText = "Your newly generated password with a length of "+length+" is: "+password;
};

var display = "", result = 0, lastNum=-1, number = "", operation = -1, clearDisplay=false;

function NumberClick(btn){
    if(clearDisplay == true){
        display = ""; 
        clearDisplay = false;
    }
    let num = btn.innerText;
    number+= num;
    display+=num;
    UpdateDisplay();
    //console.log("[Debug - Number click] number: "+number+" lastNum: "+lastNum);
};

function OperationClick(btn){
    let op = btn.innerText;
    display+=op;
    UpdateDisplay();
    
    if(number!=""){
        lastNum = parseInt(number);
        //console.log("[Debug - Op Click Start] number: "+number+" lastNum: "+lastNum);
        number = "";

        if(operation==-1){
            result = lastNum;
            //console.log("[Debug - Op Click If] number: "+number+" lastNum: "+lastNum);
        }
        else {
            Compute();
            //console.log("[Debug - Op Click Else] number: "+number+" lastNum: "+lastNum);
        } 
    }

    if(op=="root" || op == "log" || op == "^"){
        if(lastNum==-1){
            display="Choose a number first";
            clearDisplay = true;
            return UpdateDisplay();
        }
    }

    switch(op){
        case "+":
            operation = 0;
            break;
        case "−":
            operation = 1;
            break;
        case "x":
            operation = 2;
            break;
        case "÷":
            operation = 3;
            break;
        case "^":
            operation = 4;
            break;
        case "log":
            operation = 5;
            break;
        case "root":
            operation = 6;
            break;
        default:
            break;
    }
};

function Compute(){
    if(number!=""&&lastNum!=-1){
       lastNum = parseInt(number);
        number="";
        //console.log("[Debug - Compute If] number: "+number+" lastNum: "+lastNum);
    }
    if(operation==0){ // plus
        result+= lastNum;
        //console.log("[Debug - Compute Add] number: "+number+" lastNum: "+lastNum);
    } 
    else if(operation==1){ // subtract
        result-= lastNum;
    } 
    else if(operation==2){ // multiplication
        result*= lastNum;
    }
    else if(operation==3){ // division
        if(lastNum!=0) result/= lastNum;
    }
    else if(operation==4){ // power
        result = Math.pow(result, lastNum);
    }
    else if(operation==5){ // log
        result = Math.log(lastNum);
    }
    else if(operation==6){ // root
        result = Math.sqrt(lastNum);
    }

    document.getElementById("outputResult").innerText = result;
    UpdateDisplay();
    //console.log("[Debug - Compute End] number: "+number+" lastNum: "+lastNum);
};

function UpdateDisplay(){
    document.getElementById("outputText").innerText = display;
};

function ClearClick(btn){
    if(btn.innerText == "C"){
        display = ""; result = 0; 
        lastNum=-1; number = "";
        operation = -1;
        document.getElementById("outputResult").innerText = "";
        UpdateDisplay();
    }
    else if(btn.innerText=="DEL"){
        display = display.slice(0, -1);
        number = number.slice(0, -1);
        if(display==""){
            display = ""; result = 0; 
            lastNum=-1; number = "";
            operation = -1;
            document.getElementById("outputResult").innerText = "";
        }
        UpdateDisplay();
    }
};