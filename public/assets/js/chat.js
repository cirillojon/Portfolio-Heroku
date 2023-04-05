const chatInputForm = document.getElementById("chat-input-form");
const userMessageInput = document.getElementById("user-message");
const chatMessages = document.getElementById("chat-messages");

chatInputForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userMessage = userMessageInput.value;
  userMessageInput.value = "";

  // Display user message
  chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

  // Fetch response from ChatGPT
  const gptResponse = await getGptResponse(userMessage);

  // Display ChatGPT response
  chatMessages.innerHTML += `<p><strong>ChatGPT:</strong> ${gptResponse}</p>`;
  chatMessages.scrollTop = chatMessages.scrollHeight;
});


async function getGptResponse(message) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });

  if (!response.ok) {
    console.error(`Error fetching GPT response: ${response.statusText}`);
    return "Sorry, something went wrong.";
  }

  const data = await response.json();
  return data.message;
}

