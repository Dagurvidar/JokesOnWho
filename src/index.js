import { el, sleep } from "./lib/elements.js";
const API_URL = "https://v2.jokeapi.dev/joke/Any?type=twopart";

document.getElementById("jokeButton").addEventListener("click", fetchJoke);

/**
 * skipt í tvo hluta
 */
async function fetchJoke() {
  // Þessi hluti inniheldur virkni fyrsta takkans,
  // sækir og birtir setup brandarans
  try {
    const divJokeSetup = document.getElementById("setup");
    divJokeSetup.textContent = "Finn brandara...";
    await sleep(1000);
    const response = await fetch(API_URL);
    const joke = await response.json();
    console.log(joke);

    divJokeSetup.textContent = joke.setup;
  } catch (error) {
    console.error("næst ekki í brandara:", error);
  }

  try {
    await sleep(500);
    const sectionUserInput = document.getElementById("userInput");
    const userInputSection = document.getElementById("userPunchline");
    const pExplanation = el(
      "p",
      {},
      "Sláðu inn þitt eigið punchline, ef það er betra eða það sama og bottin gerir, þá sigrarðu"
    );
    sectionUserInput.insertBefore(pExplanation, userInputSection);
    userInputSection.style.display = "block";
  } catch (error) {
    console.error("Eitthvað klikkaði", error);
  }
}
