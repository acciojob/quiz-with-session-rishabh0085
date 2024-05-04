// Initialize an array to store the user's answers
let userAnswers = [];

// Retrieve user's progress from session storage
const progress = sessionStorage.getItem('progress');
if (progress) {
  userAnswers = JSON.parse(progress);
}

// Display the quiz questions and choices
const questionsElement = document.getElementById("questions");
function renderQuestions() {
  questionsElement.innerHTML = '';
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.addEventListener("change", (event) => {
        // Update user's answer when an option is selected
        userAnswers[i] = event.target.value;
        sessionStorage.setItem('progress', JSON.stringify(userAnswers));
      });
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

// Submit button event listener
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  // Display score on the page
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  
  // Store score in local storage
  localStorage.setItem('score', score);
});
