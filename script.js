fetch('blender-open-data.json')
  .then(response => response.json())
  .then(data => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = Object.keys(data).filter(key => key.toLowerCase().includes(searchTerm));

      displayResults(filteredData);
    });

    function displayResults(results) {
      searchResults.innerHTML = '';

      if (results.length === 0) {
        searchResults.innerHTML = 'No se encontraron resultados.';
      } else {
        results.forEach(result => {
          const resultItem = document.createElement('p');
          resultItem.textContent = result + ": " + data[result];
          searchResults.appendChild(resultItem);
        });
      }
    }
  })
  .catch(error => {
    console.log('Ocurrió un error al cargar el archivo JSON:', error);
  });
