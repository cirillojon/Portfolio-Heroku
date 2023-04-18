const githubUsername = 'cirillojon';

async function fetchGitHubData(username) {
    const response = await fetch(`/api/github/${username}`);
    const data = await response.json();
    return data;
}

function updateGitHubProgress(userData, repos, totalCommits) {
    document.getElementById('github-username').textContent = `GitHub: ${userData.login}`;
    document.getElementById('github-repos').textContent += userData.public_repos;
    document.getElementById('github-followers').textContent += userData.followers;
    //document.getElementById('github-commits').textContent = `Commits: ${totalCommits}`;
}


// async function fetchGitHubCommits(username, repo) {
//     const commits = [];
//     let page = 1;
//     const headers = {
//         'Authorization': `Bearer ${githubApiToken}`
//     };

//     while (true) {
//         const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits?page=${page}`, { headers });
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

// (async () => {
//     const { userData, repos, totalCommits } = await fetchGitHubData(githubUsername);
//     updateGitHubProgress(userData, repos, totalCommits);
// })();

(async () => {
    const { userData, repos } = await fetchGitHubData(githubUsername);
    updateGitHubProgress(userData, repos);
})();


