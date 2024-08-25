//! Çekilen değerler / Normal değerler, bir şeyler falan.
let computerChangeImg = document.getElementById('computerPickImg'),
    computerChoice = "",
    playable = true,
    godmodeSwitch = true,
    finalResult = "";

const cheatCode = document.getElementById("cheatCode"),
      cheatCode1 = document.getElementById("cheatCode1"),
      cheatCode2 = document.getElementById("cheatCode2"),
      result = document.getElementById("result"),
      checkbox = document.getElementById("checkbox"),
      godMode = document.querySelector(".godMode"),
      paper = document.getElementById("paper"),
      rock = document.getElementById("rock"),
      scissors = document.getElementById("scissors"),
      header = document.getElementById("header"),
      circleBorder = document.querySelectorAll(".circleBorder"),
      newCircleBorder = document.querySelectorAll(".newCircleBorder"),
      finalBtn = document.querySelector('.button'), 
      computerPickImg = document.getElementById('computerPickImg'),
      computerPickText = document.getElementById('computerPickText'),
      resultText = document.getElementById('result');
    

    //! Bilgisayarın rastgele sayı üretip, işlediği kısım.
const computerResult = () => {
    let computer = Math.random();

    if (computer < 1 / 3) {
        computerChoice = "paper";
        computerChangeImg.src = "./img/paper.png"
    } else if (computer >= 1 / 3 && computer < 2 / 3) {
        computerChoice = "rock";
        computerChangeImg.src = "./img/rock.png"
    } else {
        computerChoice = "scissors";
        computerChangeImg.src = "./img/scissors.png"
    }   

    cheatCode.innerText = `Computer choice;  ${computerChoice}`
    cheatCode1.innerText = `Rand num;  ${computer.toFixed(2)}`
    cheatCode2.innerText = `Playability status;  ${playable}`;
};

computerResult();


    //! Şefin spesyali.
checkbox.addEventListener("change", function () {
    if (godmodeSwitch === true) {
        godMode.style.opacity = "1"
        godmodeSwitch = false;
    } else {
        godMode.style.opacity = "0"
        godmodeSwitch = true;
    };
});


    //! Dinleme/Seçme olayları. "burda yardım aldım :/"
function handleClick(playerChoice, element) {
    if (playable) {
        if (computerChoice === playerChoice) {
            finalResult = "It's a tie";
        } else {
            finalResult = (playerChoice === "rock" && computerChoice === "scissors") ||
                            (playerChoice === "paper" && computerChoice === "rock") ||
                            (playerChoice === "scissors" && computerChoice === "paper")
                            ? "You win!"
                            : "You lose..";
        }
        playable = false;
        styleFunc();
        audioFunc();
        result.innerText = finalResult;
        element.style.background = "yellow"; 
        cheatCode2.innerText = `Playability status;  ${playable}`;
    }
}
    
paper.addEventListener("click", function() {
    handleClick("paper", paper);
});

rock.addEventListener("click", function() {
    handleClick("rock", rock);
});

scissors.addEventListener("click", function() {
    handleClick("scissors", scissors);
});


    //! Ses efekti kısmı.
let audioFunc = () => {
    var tie = new Audio('./audio/tie.mp3');
    var lose = new Audio('./audio/lose.mp3');
    var win = new Audio('./audio/win.mp3');
    
    setTimeout(() => {
        if (finalResult === "It's a tie") {
            tie.volume = 0.3;
            tie.play();
        } else if (finalResult === "You win!") {
            win.volume = 0.3;
            win.play()
        } else { 
            lose.volume = 0.3;
            lose.play();
        }
    }, 500);
}


    //! Stil
let styleFunc = () => {
    if (playable === false) {
        header.style.fontSize = "0px";

        for (let i = 0; i < circleBorder.length; i++) {
            circleBorder[i].classList.remove("circleBorder"); 
            circleBorder[i].classList.add("newCircleBorder");
        }

        computerPickImg.style.opacity = "1";
        computerPickText.style.opacity = "1";
        finalBtn.style.display = "flex"
        finalBtn.style.translate = "0px 0px";
        computerPickImg.style.translate = "80px 0px";
        computerPickText.style.translate = "-100px 35px"; 
        resultText.style.opacity = "1";
        resultText.style.transition = "7s";
    };
}


    //! Oyunu tekrar başlatmak istediğimizdeki karşımıza çıkıcak olan stil.
let repeatStyleFunc = () => {
    if (playable === false) {
        header.style.fontSize = "46px";

        for (let i = 0; i < newCircleBorder.length; i++) {
            newCircleBorder[i].classList.remove("newCircleBorder");
            newCircleBorder[i].classList.add("circleBorder"); 
        }

        finalBtn.style.display = "none"
        finalBtn.style.translate = "0px 1000px";
        computerPickImg.style.translate = "1000px 0px";
        computerPickText.style.translate = "-1000px 35px";
        resultText.style.opacity = "0";
        resultText.style.transition = "1s";

        setTimeout(() => {
            computerPickImg.style.opacity = "0";
            computerPickText.style.opacity = "0";
        }, "300");

        setTimeout(() => {
            playable = true;
            computerResult();
        }, "1000");
    };

    cheatCode.innerText = "Wait.."
    cheatCode1.innerText = "...."
    cheatCode2.innerText = ".."

    scissors.style.background = null;
    rock.style.background = null;
    paper.style.background = null;
}

