const githubUsername = 'cirillojon';

async function fetchGitHubData(username) {
    const response = await fetch(`/api/github/${username}`);
    const data = await response.json();
    return data;
}

function updateGitHubProgress(userData, repos) {
    document.getElementById('github-username').textContent = `GitHub: ${userData.login}`;
    document.getElementById('github-repos').textContent += userData.public_repos;
    document.getElementById('github-followers').textContent += userData.followers;
}

(async () => {
    const { userData, repos } = await fetchGitHubData(githubUsername);
    updateGitHubProgress(userData, repos);
})();
