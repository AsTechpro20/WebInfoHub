function performSearch() {
  var domain = document.getElementById('search-bar').value;
  var resultsDiv = document.getElementById('results');

  if (!domain) {
    resultsDiv.innerHTML = 'Please enter a domain to search for.';
    return;
  }

  resultsDiv.innerHTML = 'Loading...';

  fetch('https://api1.astechnetwork.eu.org/info?domain=' + encodeURIComponent(domain))
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.status);
      }
      return response.json(); // Parse the JSON from the response
    })
    .then(function(data) {
      // Format and display the results
      var formattedResults = 'Domain: ' + domain + '\n' +
                             'IP Address: ' + (data.ip || 'Not available') + '\n' +
                             'Country: ' + (data.geo.country || 'Not available') + '\n' +
                             'Timezone: ' + (data.geo.timezone || 'Not available') + '\n' +
                             // ... include other fields as needed
                             'WHOIS Info: ' + (data.whois || 'Not available').replace(/\n/g, '<br>') + '\n';

      resultsDiv.innerHTML = '<pre>' + formattedResults + '</pre>';
    })
    .catch(function(error) {
      // More detailed error message
      console.error('Fetch Error:', error);
      resultsDiv.innerHTML = 'Failed to load information: ' + error.toString();
    });
}
