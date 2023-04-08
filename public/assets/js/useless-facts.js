document.addEventListener('DOMContentLoaded', () => {
  const randomFactBtn = document.getElementById('randomFactBtn');
  const todaysFactBtn = document.getElementById('todaysFactBtn');
  const factElement = document.getElementById('fact');

  randomFactBtn.addEventListener('click', () => {
    getUselessFact('https://uselessfacts.jsph.pl/random.json');
  });

  todaysFactBtn.addEventListener('click', () => {
    getUselessFact('https://uselessfacts.jsph.pl/today.json');
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
