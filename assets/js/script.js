let chatMessages = '';
let userMessage = '';
let wordList = '';


function onload () {
  fetch("https://raw.githubusercontent.com/tomislater/RandomWords/master/random_words/nouns.dat").then(res => {
    res.json().then(text => {
      wordList = text;
    })
  })

  chatMessages = document.querySelector('.js-chats');
  userMessage = document.querySelector('.js-user-msg');
  submitButton = document.querySelector('button[type="submit"]');

  chatMessages.scrollTop = chatMessages.scrollHeight;

  userMessage.addEventListener('keypress', function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === 'Enter') {
      // Cancel the default action, if needed
      event.preventDefault();
      printUserMsg(wordList);
    }
  });
}

const messageSubmitted = () => {
  userMessage.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const printUserMsg = (words = '') => {
  if (userMessage.value.trim() !== '') {
    const newChildDiv = createElement('p', userMessage.value);
    newChildDiv.classList.add('chat');
    newChildDiv.classList.add('user');
    chatMessages.appendChild(newChildDiv);

    // Get random word to as a reply
    setTimeout(function () {
      printRecipientMsg(getRandomWord(words));
    }, 1000)
    messageSubmitted();
  }
}

const printRecipientMsg = (message) => {
  const newChildDiv = createElement('p', message);
  newChildDiv.classList.add('chat');
  newChildDiv.classList.add('recipient');
  chatMessages.appendChild(newChildDiv);
}

const createElement = (el, txt) => {
  const elem = document.createElement(el);
  const elemContent = document.createTextNode(txt);
  elem.appendChild(elemContent);

  return elem;
}

function randomRange (myMin, myMax) {
  return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

const getRandomWord = () => {
  let letter = Object.keys(wordList)[randomRange(0, Object.keys(wordList).length)]
  let word = randomRange(0, Object.keys(wordList[letter]).length)
  return wordList[letter][word]
}
