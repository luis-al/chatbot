const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

// Función para crear un elemento de chat
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

// Función para generar respuesta
const generateResponse = async (incomingChatLi) => {
  const messageElement = incomingChatLi.querySelector("p");

  try {
    const response = await fetch(
      "https://web-flowise.utwq30.easypanel.host/api/v1/prediction/dcf0859b-aff5-4fed-9436-2acc5f9cccd6",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: No se pudo obtener respuesta de la API`);
    }

    const result = await response.json();
    console.log("Respuesta de la API:", result);

    // Mostrar el campo 'text' que contiene la respuesta
    const answer = result.text || "Lo siento, no tengo una respuesta en este momento.";
    messageElement.textContent = answer;
  } catch (error) {
    messageElement.textContent = "Ocurrió un error al procesar tu solicitud.";
    console.error("Error:", error);
  }
};

// Manejo del chat
const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Pensando...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 500);
};

// Ajuste automático del textarea
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Enviar mensaje al presionar Enter
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

// Mostrar/ocultar chatbot
chatbotToggler.addEventListener("click", () => {
  document.body.classList.toggle("show-chatbot");
});

chatbotCloseBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);

// Botón de enviar mensaje
sendChatBtn.addEventListener("click", handleChat);
