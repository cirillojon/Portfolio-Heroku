const githubUsername = 'cirillojon';
const githubApiBaseUrl = 'https://api.github.com/users/';

async function fetchGitHubUserData(username) {
    const response = await fetch(`${githubApiBaseUrl}${username}`);
    const data = await response.json();
    return data;
}

async function fetchGitHubRepos(username) {
    const response = await fetch(`${githubApiBaseUrl}${username}/repos`);
    const data = await response.json();
    return data;
}

// async function fetchGitHubCommits(username, repo) {
//     const commits = [];
//     let page = 1;

//     while (true) {
//         const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?page=${page}`);
//         const data = await response.json();

//         if (data.length === 0) {
//             break;
//         }

//         commits.push(...data);
//         page++;
//     }

//     return commits;
// }


// async function fetchOverallCommits(username) {
//     const repos = await fetchGitHubRepos(username);
//     let totalCommits = 0;

//     for (const repo of repos) {
//         const commitsData = await fetchGitHubCommits(username, repo.name);
//         totalCommits += commitsData.length;
//     }

//     return totalCommits;
// }

function updateGitHubProgress(userData) {
    document.getElementById('github-username').textContent = `GitHub: ${userData.login}`;
    document.getElementById('github-repos').textContent += userData.public_repos;
    document.getElementById('github-followers').textContent += userData.followers;
    //document.getElementById('github-commits').textContent += totalCommits;
}

(async () => {
    const userData = await fetchGitHubUserData(githubUsername);
    //const totalCommits = await fetchOverallCommits(githubUsername);
    updateGitHubProgress(userData);
})();
