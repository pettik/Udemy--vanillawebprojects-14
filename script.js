const cardsContainer = document.querySelector('#cards-container');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const currentEl = document.querySelector('#current');
const showBtn = document.querySelector('#show');
const hideBtn = document.querySelector('#hide');
const questionEl = document.querySelector('#question');
const answerEl = document.querySelector('#answer');
const addCardBtn = document.querySelector('#add-card');
const clearBtn = document.querySelector('#clear');
const addContainer = document.querySelector('#add-container');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();


// Store card data
// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable',
//         answer: 'Container for a pice of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'tisIsAVariable'
//     },
// ]

// Crate all cards
function createCards() {
   cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
   const card = document.createElement('div');
   card.classList.add('card');

   if (index === 0) {
      card.classList.add('active');
   }

   card.innerHTML = `
        <div class="inner-card">
        <div class="inner-card-front">
            <p>
                ${data.question}
            </p>
        </div>
        <div class="inner-card-back">
            <p>
                ${data.answer}
            </p>
        </div>
    </div>
    `;

   // Event listnere
   card.addEventListener('click', () => {
      card.classList.toggle('show-answer');
   })

   // Add to DOM cards
   cardsEl.push(card);

   cardsContainer.appendChild(card);

   updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
   currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// GEt cards from local Storage
function getCardsData() {
   const cards = JSON.parse(localStorage.getItem('cards'));
   return cards === null ? [] : cards;
}

// Add cards to local Storage
function setCardsData(cards) {
   localStorage.setItem('cards', JSON.stringify(cards));
   window.location.reload();
}

createCards();

// Event listeners

// Next button
nextBtn.addEventListener('click', () => {
   cardsEl[currentActiveCard].className = 'card left';

   currentActiveCard = currentActiveCard + 1;

   if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = cardsEl.length - 1;
   }

   cardsEl[currentActiveCard].className = 'card active';

   updateCurrentText();
});


// Previous button
prevBtn.addEventListener('click', () => {
   cardsEl[currentActiveCard].className = 'card right';

   currentActiveCard = currentActiveCard - 1;

   if (currentActiveCard < 0) {
      currentActiveCard = 0;
   }

   cardsEl[currentActiveCard].className = 'card active';

   updateCurrentText();
});

// Show add container
showBtn.addEventListener('click', () => {
   addContainer.classList.add('show');
})

// Hide add container
hideBtn.addEventListener('click', () => {
   addContainer.classList.remove('show');
})

// Add new card
addCardBtn.addEventListener('click', () => {
   const question = questionEl.value;
   const answer = answerEl.value;

   if (question.trim() && answer.trim()) {
      // const newCard = {question:question, answer:answer};
      const newCard = {
         question,
         answer
      };

      createCard(newCard);

      questionEl.value = '';
      answerEl.value = '';

      addContainer.classList.remove('show');

      cardsData.push(newCard);


      setCardsData(cardsData);
   }
});

// CLear cards button 
clearBtn.addEventListener('click', () => {
   localStorage.clear();
   cardsContainer.innerHTML = '';
   window.location.reload();
})
