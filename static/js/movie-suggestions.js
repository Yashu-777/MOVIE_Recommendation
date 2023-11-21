document.addEventListener("DOMContentLoaded", function() {
    const movieSearch = document.getElementById("movie-search");
    const predictionForm = document.getElementById("prediction-form");
    const predictionResult = document.getElementById("prediction-result");
    
    movieSearch.addEventListener("input", function() {
        const inputValue = this.value.toLowerCase();
        if (inputValue.length >= 3) {
            // Send a request to the server to get movie suggestions
            fetch(`/get_suggestions?query=${inputValue}`)
                .then(response => response.json())
                .then(data => {
                    const suggestions = data.suggestions;
                    predictionResult.innerHTML = "";
                    if (suggestions.length > 0) {
                        suggestions.forEach(movie => {
                            const suggestionItem = document.createElement("li");
                            suggestionItem.textContent = movie;
                            suggestionItem.addEventListener("click", function() {
                                movieSearch.value = movie;
                                predictionResult.innerHTML = "";
                            });
                            predictionResult.appendChild(suggestionItem);
                        });
                    }
                });
        } else {
            predictionResult.innerHTML = "";
        }
    });

    predictionForm.addEventListener("submit", function(event) {
        // Prevent the form from submitting without selected suggestion
        if (predictionResult.children.length > 0) {
            event.preventDefault();
        }
    });
});
