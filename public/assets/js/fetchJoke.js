async function fetchJoke() {
    const url = 'https://v2.jokeapi.dev/joke/Any?safe-mode&type=single';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error(`Error fetching joke data: ${response.statusText}`);
            return;
        }

        const data = await response.json();
        document.getElementById('joke-content').textContent = data.joke;
    } catch (error) {
        console.error(`Error fetching joke data: ${error}`);
    }
}

document.getElementById('fetch-joke-btn').addEventListener('click', fetchJoke);
