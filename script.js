let Questions = [
    {
        question: 'What is the most important rule in snorkelling?',
        correct_answer: 'Never snorkel alone',
        incorrect_answers: ['Snorkel only during high tide', 'Always wear flippers', 'Only use a full-face mask']
    },
    {
        question: 'What should you do if you encounter a strong current while snorkelling?',
        correct_answer: 'Swim parallel to the shore',
        incorrect_answers: ['Swim directly against the current', 'Dive down to avoid the current', 'Float on your back']
    },
    {
        question: 'What is the purpose of a snorkel mask?',
        correct_answer: 'To see clearly underwater',
        incorrect_answers: ['To breathe underwater', 'To keep water out of your ears', 'To communicate with others']
    },
    {
        question: 'How should you breathe when using a snorkel?',
        correct_answer: 'Slowly and deeply through your mouth',
        incorrect_answers: ['Quickly and shallowly through your nose', 'Quickly and deeply through your mouth', 'Slowly and deeply through your nose']
    },
    {
        question: 'What should you do if water enters your snorkel?',
        correct_answer: 'Exhale forcefully to clear the snorkel',
        incorrect_answers: ['Remove the snorkel and swim back to shore', 'Inhale to clear the snorkel', 'Tilt your head to let the water drain out']
    },
    {
        question: 'Which marine life should you avoid touching while snorkelling?',
        correct_answer: 'All marine life',
        incorrect_answers: ['Only jellyfish', 'Only coral', 'Only sea urchins']
    },
    {
        question: 'What is the best time of day to go snorkelling?',
        correct_answer: 'Morning',
        incorrect_answers: ['Afternoon', 'Evening', 'Night']
    },
    {
        question: 'Why is it important to wear a brightly colored snorkel vest?',
        correct_answer: 'To be easily seen by others',
        incorrect_answers: ['To keep warm', 'To carry additional equipment', 'To avoid sunburn']
    },
    {
        question: 'What is the recommended depth for beginner snorkelers?',
        correct_answer: 'Shallow water, no deeper than 6 feet',
        incorrect_answers: ['10 feet', '15 feet', '20 feet']
    },
    {
        question: 'What should you do if you get a leg cramp while snorkelling?',
        correct_answer: 'Float on your back and stretch the muscle',
        incorrect_answers: ['Keep swimming to work it out', 'Dive down to relieve the pressure', 'Call for help immediately']
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
        }else if((index < currQuestion )) {
            step.classList.add('wrongAns');
        }else if((index < currQuestion && correct)) {
            step.classList.add('goodAns');
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
