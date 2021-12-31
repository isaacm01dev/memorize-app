// -------------------------------------------------------------
// SECTION 1 - USER INPUT "SAVE COMBINATIONS": 
// -------------------------------------------------------------

const conceptsInputForm = document.getElementById('conceptsInputForm');

const insertConcept = document.getElementById('insertConcept');
const insertQuestion = document.getElementById('insertQuestion');
const insertAnswer = document.getElementById('insertAnswer');

const smallErrorMessage = document.querySelector('.errorMessage');

// BUTTONS:
const saveConceptBtn = document.getElementById('saveConceptBtn');

const addNewConceptBtn = document.getElementById('addNewConceptBtn');

const objectsListArr = []; 
const errorMsg = 'please fill this field';

// COLLECT INPUT VALUES : 
const savedConceptValue = insertConcept.value;
const savedQuestionValue = insertQuestion.value;
const savedAnswerValue = insertAnswer.value;

// SHOW ERROR AND SUCESS FUNCTIONS : ERROR RED SUCESS GREEN : 

// function showError(input, errorMessage) {
//   const formInput = input.parentElement;
//   formInput.className = 'formInput error';
//   const small = formInput.querySelector('small');
//   small.innerText = message;
// }
function clearInputForm() {
  insertConcept.value = '';
  insertQuestion.value = '';
  insertAnswer.value = '';
}

function inputConcepts(e) {
  e.preventDefault(); 

  if (insertConcept.value === '' || insertQuestion.value === '' || insertAnswer.value === '') {
  //  MUST CHANGE THIS ALERT!!
   alert('Please fill in all required fields before saving');

  } else {
    objectsListArr.push({ //CCOLECTAMOS VALORE DE INPUTS
      concept: insertConcept.value,
      question: insertQuestion.value,
      answer: insertAnswer.value
    });

  }
  
}

// EVENT LISTENERS : 

function saveNewConcept() {
 if (insertConcept.value !== '' && insertQuestion.value !== '' && insertAnswer.value !== '') {
   conceptsList.push({concept: insertConcept.value});
  }
}

conceptsInputForm.addEventListener('submit', inputConcepts );
addNewConceptBtn.addEventListener('click', clearInputForm);


// -------------------------------------------------------------
// SECTION 2 - MEMORIZE "SHOW COMBINATIONS": 
// -------------------------------------------------------------

const showRandomConcept = document.getElementById('showRandomConcept');
const showRandomQuestion = document.getElementById('showRandomQuestion');
const showRandomClue = document.getElementById('showRandomClue');
const showAnswer = document.getElementById('showAnswer');

// BUTTONS:
const randomConceptBtn = document.getElementById('randomConceptBtn');
const randomQuestionBtn = document.getElementById('randomQuestionBtn');
const randomClueBtn = document.getElementById('randomClueBtn');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const clearAnswerBtn = document.getElementById('clearAnswerBtn');



// RANDOM CONCEPT BUTTON : *************************************

let getRandomObject = function() {
  let randomObj = objectsListArr[Math.floor(Math.random() * objectsListArr.length)];
  return randomObj;
}
//  CHOOSE A RANDOM OBJECT

let rdmConcept; 

let displayConcept = function() {
  rdmConcept = getRandomObject().concept; 
  showRandomConcept.innerHTML = rdmConcept; 

  deleteArrayContent(); 
  return rdmConcept;
} 

// RANDOM QUESTION BUTTON : ***********************************************

let questionObjects = [];  

let saveQuestionObjects = function() {  
  deleteArrayContent();  
  objectsListArr.forEach(obj => { 
    if (obj.concept === rdmConcept) { 
      questionObjects.push(obj); 
    } 
  }); 
  return questionObjects;
}


// ...................................
function deleteArrayContent() {
  questionObjects = [];
}
// ...................................

let getRandomQuestionObject = function() {
  let rdmQuestionObj = questionObjects[Math.floor(Math.random() * questionObjects.length)];
  return rdmQuestionObj; // retornamos para obtener un resultado al llamar a esta funcion
}

// OBJECT 
let randomQuestionObject = {}; 
// PROP 
let randomQuestion; 

let displayRandomQuestion = function() { 
  saveQuestionObjects(); // objetos qeu cumplen guardados


  randomQuestionObject = getRandomQuestionObject(); 
  randomQuestion = questionObjects[0].question; 
  randomQuestion = randomQuestionObject.question; 
  showRandomQuestion.innerHTML = randomQuestion;
  return randomQuestion; 
}

// SHOW ANSWER BUTTON : *********************************************

let correspondingAnswer = '';
  
let displayCorrespondingAnswer = function() {
  correspondingAnswer = randomQuestionObject.answer;
  if (randomQuestionObject.answer === null || randomQuestionObject.answer === undefined ) {
    showAnswer.innerHTML = 'Please, click random buttons above to get some question...';
  } else {
    showAnswer.innerHTML = correspondingAnswer;
  }
  return correspondingAnswer;
}

// RANDOM CLUE BUTTON : *********************************************


let stringArray = [];

// FUNCION CHOOSE A RANDOM WORD FROM STRING  : 

let chosenWord;

function getRandomWordFromString() {
  let chosenText = randomQuestionObject.answer; 
  stringArray = chosenText.split(' '); 
  chosenWord = stringArray[Math.floor(Math.random() * stringArray.length)];
  return chosenWord; 
}

let displayClueFromAnswer = function() {
  getRandomWordFromString();
  showRandomClue.innerHTML =  chosenWord;
}


function clearAnswer() {
  showAnswer.innerHTML = '';
}

// EVENT LISTENERS : 

randomConceptBtn.addEventListener('click', displayConcept);
randomQuestionBtn.addEventListener('click', displayRandomQuestion);
randomClueBtn.addEventListener('click', displayClueFromAnswer);
showAnswerBtn.addEventListener('click', displayCorrespondingAnswer);
clearAnswerBtn.addEventListener('click', clearAnswer);


// -------------------------------------------------------------
// SECTION 3 - "SHOW STORED VALUES": ONLY IN FRONT-END SO FAR
// -------------------------------------------------------------


const showConceptsListBtn = document.getElementById('showConceptsListBtn');
const clearConceptsListBtn = document.getElementById('clearConceptsListBtn');

const showConceptsList = document.getElementById('showConceptsList');

const conceptsList = document.querySelector('#conceptsList');

let paragraphConcept;
let paragraphQuestion;
let paragraphAnswer;

// FUNCTIONS :

// DISPLAY VALUES THROUGH DYNAMICALLY GENERATES PARAGRAPHS
function createListParagraphs() {
  paragraphConcept = document.createElement('p');
  paragraphQuestion = document.createElement('p');
  paragraphAnswer = document.createElement('p');
}


function showList() {
  showConceptsList.style.display = 'block';
   
  objectsListArr.forEach(obj => {
    
    createListParagraphs(); 
    
    // PASSING A CLASS AND DEFINE WHAT'S INSIDE :
    paragraphConcept.classList.add('conceptsList');
    paragraphConcept.innerHTML = `<br><br><strong>* CONCEPT : </strong> ${obj.concept}`; 
    conceptsList.appendChild(paragraphConcept);
    
    paragraphQuestion.classList.add('conceptsList');
    paragraphQuestion.innerHTML = `<strong>    -> Question : </strong>${obj.question}`;
    conceptsList.appendChild(paragraphQuestion);
    
    paragraphAnswer.classList.add('conceptsList');
    paragraphAnswer.innerHTML = `<strong>    -> Answer : </strong> ${obj.answer}`;
    conceptsList.appendChild(paragraphAnswer);
  });    
  
}


// TEMPORAL SOLUTION... !!!
function hideDiv() {
  showConceptsList.style.display = 'none';
}

showConceptsListBtn.addEventListener('click', showList);
clearConceptsListBtn.addEventListener('click', hideDiv);


// -------------------------------------------------------------
// SECTION 4 - "TRY AGAIN":
// -------------------------------------------------------------

const tryAgainBtn = document.getElementById('tryAgain');


let tryAgain = function() {
  deleteAllOutputs();
}


function deleteAllOutputs() {
  insertConcept.innerHTML = ' ';
  insertQuestion.innerHTML = ' ';
  insertAnswer.innerHTML = ' ';
  showRandomConcept.innerHTML = ' ';
  showRandomQuestion.innerHTML = ' ';
  showRandomClue.innerHTML = ' ';
  showAnswer.innerHTML = ' ';
}

tryAgainBtn.addEventListener('click', deleteAllOutputs);




