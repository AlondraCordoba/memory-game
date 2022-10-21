const cards = document.querySelectorAll(".card");

let matched = 0;
let firstCard, secondCard;
let disabled = false;

function cardFlipped({target: cardSelected}) {
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
        if(matched == 8) {
            setTimeout(() => {
                return cardRandom();
            }, 1000);
        }
        firstCard.removeEventListener("click", cardFlipped);
        secondCard.removeEventListener("click", cardFlipped);
        firstCard = secondCard = "";
        return disabled = false;
    }
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        firstCard = secondCard = "";
        disabled = false;
    }, 1200);
}

function cardRandom() {
    matched = 0;
    disabled = false;
    firstCard = secondCard = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-card img");
        imgTag.src = `assets/img/icon-${arr[i]}.png`;
        card.addEventListener("click", cardFlipped);
    });
}

cardRandom();

cards.forEach(card => {
    card.addEventListener("click", cardFlipped);
});