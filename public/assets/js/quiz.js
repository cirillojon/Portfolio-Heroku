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
    if (!data.results || !data.results.length) {
      throw new Error(`OpenTDB response code ${data.response_code}`);
    }
    renderQuiz(data.results.map(decodeQuestion));
  } catch (error) {
    console.error(`Error fetching quiz data: ${error}`);
    quizContainer.textContent = "Trivia is currently unavailable. Please try again in a few seconds.";
    quizContainer.style.display = "block";
  }
}

// OpenTDB returns HTML entities (e.g. &quot;); decode so answers compare and display correctly.
function decodeHtml(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

function decodeQuestion(question) {
  const correct = decodeHtml(question.correct_answer);
  const answers = question.incorrect_answers.map(decodeHtml).concat(correct);
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  return { question: decodeHtml(question.question), correct_answer: correct, answers };
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML.replace(/"/g, "&quot;");
}

function renderQuiz(questions) {
  let quizHtml = "";
  document.getElementById("score-display").innerHTML = "";
  questions.forEach((question, index) => {
    quizHtml += `<div class="question">
      <h3>Question ${index + 1}: ${escapeHtml(question.question)}</h3>
      <ul>
        ${question.answers
          .map(
            (answer) =>
              `<li>
                <label class="answer-option">
                  <input type="radio" name="question-${index}" value="${escapeHtml(answer)}">
                  <span class="checkmark"></span>
                  ${escapeHtml(answer)}
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
hideQuizBtn.addEventListener("click", hideQuiz);