const cards = document.querySelectorAll(".card"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matched = 0;
let disabled = false;
let isPlaying = false;
let firstCard, secondCard, timer;

function cardFlipped({target: cardSelected}) {
    if(!isPlaying) {
        isPlaying = true;
    }
    if(firstCard !== cardSelected && !disabled) {
        cardSelected.classList.add("flip");
        if(!firstCard) {
            return firstCard = cardSelected;
        }
        secondCard = cardSelected;
        disabled = true;
        let firstCardImg = firstCard.querySelector(".back-card img").src,
        secondCardImg = secondCard.querySelector(".back-card img").src;
        cardsMatched(firstCardImg, secondCardImg);
    }
}

function cardsMatched(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8 && timeLeft > 0) {
            return clearInterval(timer);
        }
        firstCard.removeEventListener("click", cardFlipped);
        secondCard.removeEventListener("click", cardFlipped);
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard = secondCard = "";
        return disabled = false;
    }
    setTimeout(() => {
        firstCard.classList.add("shake");
        secondCard.classList.add("shake");
        flips++;
        flipsTag.innerText = flips;
    }, 400);

    setTimeout(() => {
        firstCard.classList.remove("shake", "flip");
        secondCard.classList.remove("shake", "flip");
        firstCard = secondCard = "";
        disabled = false;
    }, 1200);
}

function cardRandom() {
    timeLeft = maxTime;
    flips = matched = 0;
    firstCard = secondCard = "";
    clearInterval(timer);
    flipsTag.innerText = flips;
    disabled = isPlaying = false;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.round(Math.random()) - 0.5);

    cards.forEach((card, i) => {
        card.classList.remove("flip", "matched");
        let imgTag = card.querySelector(".back-card img");
        setTimeout(() => {
            imgTag.src = `assets/img/icon-${arr[i]}.png`;
        }, 500);
        card.addEventListener("click", cardFlipped);
    });
}

cardRandom();

refreshBtn.addEventListener("click", cardRandom);

cards.forEach(card => {
    card.addEventListener("click", cardFlipped);
});
