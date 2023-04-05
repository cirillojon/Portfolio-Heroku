const quizContainer = document.getElementById("quiz-container");
const viewQuizBtn = document.getElementById("view-quiz-btn");
const hideQuizBtn = document.getElementById("hide-quiz-btn");

async function fetchQuizQuestions() {
  const url = "https://opentdb.com/api.php?amount=10&type=multiple";
  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Error fetching quiz data: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    renderQuiz(data.results);
  } catch (error) {
    console.error(`Error fetching quiz data: ${error}`);
  }
}

function renderQuiz(questions) {
  let quizHtml = "";
  questions.forEach((question, index) => {
    const answers = question.incorrect_answers.concat(question.correct_answer);
    quizHtml += `<div class="question">
      <h3>Question ${index + 1}: ${question.question}</h3>
      <ul>
        ${answers
          .map(
            (answer) =>
              `<li>
                <label class="answer-option">
                  <input type="radio" name="question-${index}" value="${answer}">
                  <span class="checkmark"></span>
                  ${answer}
                </label>
              </li>`
          )
          .join("")}
      </ul>
    </div>`;
  });

  quizHtml += `<button id="submit-quiz">Submit Quiz</button>`;
  quizContainer.innerHTML = quizHtml;
  document.getElementById("submit-quiz").addEventListener("click", () => submitQuiz(questions));
  quizContainer.style.display = "block";
  hideQuizBtn.style.display = "inline-block";
}

function submitQuiz(questions) {
  let score = 0;
  questions.forEach((question, index) => {
    const userAnswer = document.querySelector(
      `input[name="question-${index}"]:checked`
    );

    if (userAnswer && userAnswer.value === question.correct_answer) {
      score++;
    }
  });

  document.getElementById("score-display").innerHTML = `You scored ${score} out of ${questions.length}`;
}

function hideQuiz() {
    quizContainer.style.display = "none";
    hideQuizBtn.style.display = "none";
}

viewQuizBtn.addEventListener("click", fetchQuizQuestions);
viewQuizBtn.addEventListener("click", fetchQuizQuestions);
hideQuizBtn.addEventListener("click", hideQuiz);