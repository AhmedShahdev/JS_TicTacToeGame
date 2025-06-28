// yaha mene access kara hai elements ko tamam k taman throigh dom manipulation
let boxes = document.querySelectorAll(".box");
let newbtn = document.querySelector(".newbtn");
let resetbtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let msgcontainer = document.querySelector(".msgcontainer");


// ab isme veriable deya hoga
let turn0 = false; // ab x se shuru hoga
let count = 0;

// isme winning patterns dedege array k lie
const WinningPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [6, 7, 8], [3, 4, 5], [2, 5, 8]
];

//isme resetgame or new gamek lie function banaya jaega, ye click krne k pr shuru krega game
const resetGame =()=>{
   turn0 = true; //o se shuru hga
   enabledboxes();
   count = 0;
   msgcontainer.classList.add("hide"); 
};

// isme boxes ko disable karne k lie function dena hga jb winner ya draw jo bhi ho boxes non clickable hon
const disabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};

// yahan boxes ko enabled karwaya jaega like resetfunction ki help krega or all boxes cleared hnga
const enabledboxes = ()=>{
    for(let box of boxes){
        box.disabled = false; //qk menebox ko disabled nhi karna
        box.innerText= "";
    }
};

/*yahan pr winner ko check kra jaeyga compare krwaya jaega , pattern match k zrye k ye same k sath match hue to win 
or agar sb boxes full hyn to draw wrna winner x or O */
const checkWinner =()=>{
    for(pattern of WinningPatterns){
        //qk winning 3 boxes based hi hgi islie isko mene uthaya hai or iske bad compare kruga
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
    
    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
           }
        }
    }
    if(count === 9){
        showDraw();
    }
};

// yaha pr winner k lie function dea jaega
const showWinner = (winner)=>{
    msg.innerHTML = `Congrats , Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
};

//ab yaha pr draw k lie function dea jaega
const showDraw = ()=>{
    msg.innerHTML = "It's Draw";
    msgcontainer.classList.remove("hide");
    disabledboxes();
};


// ab mene yahan jaker events lagaliye k kia click krne pr kia hoga
boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        } else{
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});


//or ye btns par game restart hoga
resetbtn.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);