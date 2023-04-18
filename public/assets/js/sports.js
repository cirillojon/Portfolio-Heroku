// Fetch last 5 events for a team
function fetchLast5Events() {
    const apiKey = "3";
    const teamId = "136958"; // Replace this with the desired team's ID
    const apiUrl = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventslast.php?id=${teamId}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const events = data.results;
        displayEvents(events);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }
  

// Display events in the HTML
function displayEvents(events) {
    const eventsList = document.getElementById("events-list");
  
    events.forEach((event) => {
      //const homeScore = event.intHomeScore !== null ? event.intHomeScore : '-';
      //const awayScore = event.intAwayScore !== null ? event.intAwayScore : '-';
  
      const listItem = document.createElement("li");
      listItem.textContent = `${event.strEvent} | ${event.dateEvent}`;
      eventsList.appendChild(listItem);
    });
  }
  


// Call the fetch function when the page loads
document.addEventListener("DOMContentLoaded", fetchLast5Events);
