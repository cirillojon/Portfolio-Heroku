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

// Community stats APIs; try each until one responds with totalSolved/totalQuestions.
const leetcodeApis = [
  (username) => `https://leetcode-api-faisalshohag.vercel.app/${username}`,
  (username) => `https://leetcode-stats.tashif.codes/${username}`,
];

async function fetchLeetCodeUserData(username) {
  for (const buildUrl of leetcodeApis) {
    try {
      const response = await fetch(buildUrl(username));
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      if (data.totalSolved != null && data.totalQuestions) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return null;
}

function updateLeetCodeProgress(data) {
  document.getElementById('leetcode-solved').textContent = data.totalSolved;
  document.getElementById('leetcode-total').textContent = data.totalQuestions;
  document.getElementById('leetcode-completion').textContent = (
    (data.totalSolved / data.totalQuestions) * 100
  ).toFixed(2);
}


(async () => {
  const userData = await fetchLeetCodeUserData(leetcodeUsername);

  if (userData) {
    updateLeetCodeProgress(userData);
  } else {
    const leetcodeProgressWidget = document.getElementById('leetcode-progress-widget');
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'LeetCode data is currently unavailable. Please try again later.';
    leetcodeProgressWidget.appendChild(errorMessage);
  }
})();

