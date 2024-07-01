let Questions = [
    {
        question: 'In which year was SoftTeco founded?',
        correct_answer: '2008',
        incorrect_answers: ['2010', '2012', '2014']
    },
    {
        question: 'Where is the headquarters of SoftTeco located?',
        correct_answer: 'Kaunas, Lithuania',
        incorrect_answers: ['Vilnius, Lithuania', 'Riga, Latvia', 'Tallinn, Estonia']
    },
    {
        question: 'Which certification does SoftTeco hold for quality management?',
        correct_answer: 'ISO 9001',
        incorrect_answers: ['ISO 14001', 'ISO 27001', 'ISO 45001']
    },
    {
        question: 'What percentage of SoftTeco employees have been with the company for more than three years?',
        correct_answer: '78%',
        incorrect_answers: ['50%', '60%', '70%']
    },
    {
        question: 'Which of the following is NOT a service offered by SoftTeco?',
        correct_answer: 'Cybersecurity Training',
        incorrect_answers: ['Web Development', 'Mobile App Development', 'Machine Learning']
    },
    {
        question: 'What is the employee retention rate at SoftTeco?',
        correct_answer: '90%',
        incorrect_answers: ['75%', '80%', '85%']
    },
    {
        question: 'Which engagement model does SoftTeco offer?',
        correct_answer: 'Dedicated Team',
        incorrect_answers: ['Freelance', 'Temporary Hire', 'Internship']
    },
    {
        question: 'What is a core value at SoftTeco?',
        correct_answer: 'Trust',
        incorrect_answers: ['Competition', 'Individualism', 'Secrecy']
    },
    {
        question: 'How many projects has SoftTeco successfully delivered?',
        correct_answer: '450',
        incorrect_answers: ['200', '300', '400']
    },
    {
        question: 'Which technology is NOT listed as a competency at SoftTeco?',
        correct_answer: 'Ruby on Rails',
        incorrect_answers: ['Java', 'Python', 'Node.js']
    }
];

// Shuffle questions
Questions.sort(() => Math.random() - 0.5);

let currQuestion = 0;
let score = 0;

const ques = document.getElementById('ques');
const opt = document.getElementById('opt');
const startBtn = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score');
const submitButton = document.getElementById("btn");
const playAgainBtn = document.getElementById('play-again-btn');
const progressBarContainer = document.getElementById('progress-bar-container');
var nextQuest = true;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !submitButton.disabled) {
        checkAns();
    }
});

function startQuiz() {
	disableBtn();	
    startBtn.style.display = 'none';
	quizContainer.style.display = 'block';
    createProgressBar();
    loadQues();
}

function createProgressBar() {
    progressBarContainer.innerHTML = '';
    for (let i = 0; i < Questions.length; i++) {
        const progressStep = document.createElement('div');
        progressStep.classList.add('progress-step');
        if (i === 0) progressStep.classList.add('highlighted');
        const stepNumber = document.createElement('div');
        stepNumber.classList.add('progress-step-number');
        stepNumber.innerText = i + 1;
        progressStep.appendChild(stepNumber);
        progressBarContainer.appendChild(progressStep);
    }
 

    const progressLine = document.createElement('div');
    progressLine.classList.add('progress-line');
    progressBarContainer.appendChild(progressLine);
}

function updateProgressBar(correct) {
	disableBtn();
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLine = document.querySelector('.progress-line');
    progressSteps.forEach((step, index) => {
        if (index == currQuestion) {
            step.classList.add('highlighted');
        }else if(index < currQuestion) {
            step.classList.add('doneAns');
        }
            
    });

    const activeSteps = document.querySelectorAll('.progress-step.active').length;
    progressLine.style.width = `${(activeSteps - 1) / (Questions.length - 1) * 100}%`;
}

function loadQues() {
    const currentQuestion = Questions[currQuestion].question;
    ques.innerText = currentQuestion;
    opt.innerHTML = '';
    const correctAnswer = Questions[currQuestion].correct_answer;
    const incorrectAnswers = Questions[currQuestion].incorrect_answers;
    const options = [correctAnswer, ...incorrectAnswers];
    options.sort(() => Math.random() - 0.5);
	
    options.forEach(option => {
        const choicesdiv = document.createElement('div');
        choicesdiv.classList.add('option');
        choicesdiv.innerText = option;
        choicesdiv.onclick = () => {
			selectOption(choicesdiv, option);
		}
        opt.appendChild(choicesdiv);
    });
}
function disableBtn() {
    document.getElementById("btn").disabled = true;
}

function enableBtn() {
    document.getElementById("btn").disabled = false;
}

function selectOption(choiceDiv) {
	enableBtn();
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        selectedOption.classList.remove('selected');
    }
    choiceDiv.classList.add('selected');
}

function loadScore() {
	progressBarContainer.style.display = 'none';
    scoreContainer.textContent = `Your score is ${score}!`;
    scoreContainer.style.display = 'block';
    playAgainBtn.style.display = 'block';
}

function nextQuestion(correct) {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
        updateProgressBar(correct);
    } else {
        document.getElementById('opt').style.display = 'none';
        document.getElementById('ques').style.display = 'none';
        document.getElementById('btn').style.display = 'none';
        loadScore();
    }
}

function checkAns() {
    nextQuest = !nextQuest;
    const selectedAns = document.querySelector('.option.selected');
    var correct;
    if (selectedAns) {
        if (selectedAns.innerText === Questions[currQuestion].correct_answer) {
            selectedAns.classList.add('correct');
            correct = true;
            score++;
        } else {
            selectedAns.classList.add('wrong');
            correct = false;
            document.querySelectorAll('.option').forEach(option => {
                if (option.innerText === Questions[currQuestion].correct_answer) {
                    option.classList.add('correct');
                }
            });
        }
        submitButton.innerHTML = "NEXT";
        if(nextQuest === true){
        nextQuestion(correct);
        submitButton.innerHTML = "SUBMIT";

        }
    }
}

function playAgain() {
    currQuestion = 0;
    score = 0;
    scoreContainer.style.display = 'none';
    playAgainBtn.style.display = 'none';
    startBtn.style.display = 'none';
	createProgressBar();
	loadQues();
	disableBtn();
	progressBarContainer.style.display = "flex";
    document.getElementById('opt').style.display = 'grid';
    document.getElementById('ques').style.display = 'block';
    document.getElementById('btn').style.display = 'inline-block';
}
