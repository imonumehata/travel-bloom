// JavaScript for Task 7: Handling Keyword Search

// Function to handle the search button click event
document.getElementById('searchButton').addEventListener('click', function () {
    // Get the search input value
    const keyword = document.getElementById('searchInput').value.trim().toLowerCase();

    if(keyword){
        fetch("./travel_recommendation_api.json")
        .then((response) => response.json())
        .then((data) => {
        let filteredResults = [];

        // Search in countries
        data.countries.forEach((country) => {
            country.cities.forEach((city) => {
            if (city.name.toLowerCase().includes(keyword) || keyword === 'country' || keyword === 'countries' ) {
                filteredResults.push(city);
            }
            });
        });

        // Search in temples
        data.temples.forEach((temple) => {
            if (temple.name.toLowerCase().includes(keyword) || keyword === 'temple' || keyword === 'temples') {
            filteredResults.push(temple);
            }
        });

        // Search in beaches
        data.beaches.forEach((beach) => {
            if (beach.name.toLowerCase().includes(keyword) || keyword === 'beach' || keyword === 'beaches') {
            filteredResults.push(beach);
            }
        });

        console.log(filteredResults); // Log the filtered results to check what matches the keyword
        displayRecommendations(filteredResults);
        })
        .catch((error) => console.error("Error fetching recommendations:", error));
    }

});

function displayRecommendations(recommendations) {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const suggestionBox = document.getElementById('suggestion-box');
    suggestionBox.innerHTML = '';  // Clear previous suggestions
   
    if (recommendations.length === 0) {
        suggestionBox.style.display = 'none';  // Hide if no results
        return;
    }

    suggestionBox.style.display = 'block';  // Show suggestion box

    recommendations.forEach(recommendation => {

        const options = { timeZone: recommendation.timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const localTime = new Date().toLocaleTimeString('en-US', options);
        const suggestionHTML = `
            <div class="suggestion-item">
                <img src="${recommendation.imageUrl}" alt="${recommendation.name}" class="suggestion-image"/>
                <div class="suggestion-text">
                    <strong class="suggestion-name">${recommendation.name}</strong>
                    <p class="suggestion-description">${recommendation.description}</p>
                    <p class="suggestion-description">Current time: ${localTime}</p>
                </div>
            </div>
        `;
        suggestionBox.innerHTML += suggestionHTML;
    });
}

// Function to clear the search input and hide the suggestion box
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('suggestion-box').innerHTML = '';
    document.getElementById('searchInput').value = '';
});