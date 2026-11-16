document.addEventListener('DOMContentLoaded', () => {
  const randomFactBtn = document.getElementById('randomFactBtn');
  const todaysFactBtn = document.getElementById('todaysFactBtn');
  const factElement = document.getElementById('fact');

  randomFactBtn.addEventListener('click', () => {
    getUselessFact('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
  });

  todaysFactBtn.addEventListener('click', () => {
    getUselessFact('https://uselessfacts.jsph.pl/api/v2/facts/today?language=en');
  });

  async function getUselessFact(endpoint) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching data (${response.status})`);
      }

      const data = await response.json();
      factElement.textContent = data.text;
    } catch (error) {
      console.error(error);
      factElement.textContent = 'Error fetching fact.';
    }
  }
});
