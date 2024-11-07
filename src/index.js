import { createCard, el, sleep } from "./lib/elements.js";
const API_URL = "https://v2.jokeapi.dev/joke/Any?type=twopart";

document.getElementById("jokeButton").addEventListener("click", renderSetup);

async function fetchJoke() {
  try {
    const response = await fetch(API_URL);
    const joke = await response.json();
    const setup = joke.setup;
    const punchline = joke.delivery;
    return [setup, punchline];
  } catch (error) {
    console.error("Could not fetch joke:", error);
    return ["", ""];
  }
}

/**
 * skipt í tvo hluta
 */
async function renderSetup() {
  // Þessi hluti inniheldur virkni fyrsta takkans,
  // sækir og birtir setup brandarans
  try {
    const divJokeSetupSection = document.getElementById("setup");
    const jokeSetup = divJokeSetupSection.appendChild(el("p", {}));
    jokeSetup.textContent = "Finn brandara...";
    await sleep(1000);
    const [setup, punchline] = await fetchJoke();

    jokeSetup.textContent = setup;

    fetchUserInput(punchline);
  } catch (error) {
    console.error("næst ekki í brandara:", error);
  }
}

async function fetchUserInput(API_Punchline) {
  try {
    await sleep(500);
    const sectionUserInput = document.getElementById("userInput");
    const userInputSection = document.getElementById("userPunchline");
    const pExplanation = el(
      "p",
      {},
      "Sláðu inn þitt eigið punchline, svo kýstu hvort þú eða bottinn hafi sigrað!"
    );
    sectionUserInput.insertBefore(pExplanation, userInputSection);
    userInputSection.style.display = "block";
    const sendUserInputButton = el(
      "button",
      { id: "sendUserInputButton" },
      "Senda"
    );
    sectionUserInput.appendChild(sendUserInputButton);

    sendUserInputButton.addEventListener("click", () =>
      renderUserInput(API_Punchline)
    );
  } catch (error) {
    console.error("Eitthvað klikkaði", error);
  }
}

function renderUserInput(API_Punchline) {
  const userPunchline = document.getElementById("userPunchline").value;

  const cardSection = document.getElementById("comparison");

  const userCard = createCard(userPunchline, "Vote for user", "voteUser");
  const apiCard = createCard(API_Punchline, "Vote for API", "voteApi");

  // Append both cards to the cardSection container
  cardSection.appendChild(userCard);
  cardSection.appendChild(apiCard);

  const voteUserButton = document.getElementById("voteUser");
  const voteApiButton = document.getElementById("voteApi");

  voteUserButton.addEventListener("click", () => renderWinner(true));
  voteApiButton.addEventListener("click", () => renderWinner(false));
}

function renderWinner(userIsTrue) {
  const victorSection = document.getElementById("results");

  // skrítna merkjarunar að neðan eru emojis
  const winnerMessage = userIsTrue
    ? "You beat me &#128546"
    : "Hahahahaahah gotcha! &#128514&#128521&#128526&#128523&#128536;";

  const winner = createCard(winnerMessage, "fetch new joke?", "resetButton");
  const messageSection = winner.querySelector("p");
  messageSection.innerHTML = winnerMessage;
  victorSection.appendChild(winner);
}
