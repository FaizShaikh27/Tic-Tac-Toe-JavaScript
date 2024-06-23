let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let clicks =0;
let winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

//Alternate Turns
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO){
            box.innerText = "O";
            box.classList.add("yellow");
            box.classList.remove("black");
            turnO = false;
            clicks+=1;
        }else{
            box.innerText = "X";
            box.classList.add("black");
            box.classList.remove("yellow");
            turnO = true;
            clicks+=1;
        }
        box.disabled= true;
        console.log(clicks);
        if(clicks==9){
            draw();
            clicks = 0;
        }else{
        checkWinner();
        }
    })
});

//Disabling Clicks Of Button
const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

//Enabling Clicks Of Button
const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText = "";
    }
};

//Draw Condition
const draw = ()=>{
    msg.innerText = `It was a draw`;
    msgContainer.classList.remove("hide");
}

//Winner
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); 
    clicks=0;
};

//Check Winner
const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val !="" && pos3Val !=""){
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                showWinner(pos1Val);
            }
        }
    }
};

//Reset Game
const resetGame = () =>{
    turnO= true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);