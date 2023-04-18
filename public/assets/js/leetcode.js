const leetcodeUsername = 'joncirillo';

const query = `
query getUserProfile($username: String!) {
  userProfile(username: $username) {
    username
    submissionProgress {
      totalSubmissions
      waSubmissions
      acSubmissions
      reSubmissions
      otherSubmissions
      acTotal
      questionTotal
    }
  }
}`;

async function fetchLeetCodeUserData(username) {
  const response = await fetch('/leetcode-api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        username,
      },
    }),
  });
  const data = await response.json();
  return data.data.userProfile;
}

function updateLeetCodeProgress(userData) {
  document.getElementById('leetcode-username').textContent = userData.username;
  document.getElementById('leetcode-solved').textContent = userData.submissionProgress.acTotal;
  document.getElementById('leetcode-total').textContent = userData.submissionProgress.questionTotal;
  document.getElementById('leetcode-completion').textContent = (
    (userData.submissionProgress.acTotal / userData.submissionProgress.questionTotal) * 100
  ).toFixed(2);
}

(async () => {
  const userData = await fetchLeetCodeUserData(leetcodeUsername);
  updateLeetCodeProgress(userData);
})();
