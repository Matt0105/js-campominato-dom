
function bombGenerator(nBombs, blackList, nSquare) {

    for(let i = 0; i < nBombs; i++) {

        let randomBomb = Math.floor(Math.random() * nSquare) + 1;
        while(blackList.includes(randomBomb)) {
            randomBomb = Math.floor(Math.random() * nSquare) + 1;
        }
        blackList.push(randomBomb);
    }

    return blackList;
}


const battleground = document.querySelector(".battleground");
const choice = document.getElementById("difficult");
const playBtn = document.getElementById("play");
const userScore = document.querySelector(".punteggio");

playBtn.addEventListener("click", function() {
    
    const numberBombs = 16; 
    let blackList = [];
    let numberSquare;
    let squareSide;
    let score = 0;

    battleground.innerHTML = "";
    userScore.style.color = "black";
    userScore.innerHTML = "Punteggio: 0";

    if(choice.value == "easy") {
        numberSquare = 100;
        squareSide = 10;
    }
    else if(choice.value == "hard") {
        numberSquare = 81;
        squareSide = 9;
    }
    else {
        numberSquare = 49;
        squareSide = 7;
    }

    blackList = bombGenerator(numberBombs, blackList, numberSquare);

    // console.log(blackList);
    let exploded = false;
    
    for(let i = 0; i < numberSquare; i++) {

        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `calc(100% / ${squareSide})`;
        square.style.height = `calc(100% / ${squareSide})`;

        square.append(i+1);      

        if(blackList.includes(parseInt(square.textContent))) {
            square.classList.add("bomb");
        }

        square.addEventListener("click", function() {

            if(this.classList.contains("bomb") && userScore.style.color != "green") {

                exploded = true;
                userScore.innerHTML = `SCONFITTA: ${score} Punti`;
                userScore.style.color = "red";

                for(let i = 0; i < numberBombs; i++) {
                    
                    document.querySelectorAll(".bomb")[i].classList.add("wrong");
                }

            }
            else if(!exploded && !(this.classList.contains("correct"))){

                this.classList.add("correct");
                score++;
                userScore.innerHTML = `Punteggio: ${score}`;
                
                if(numberSquare - blackList.length == score) {

                    userScore.innerHTML = `VITTORIA: ${score} Punti`;
                    userScore.style.color = "green";
                }
            }

        });
        
        battleground.append(square);
    }

    });






