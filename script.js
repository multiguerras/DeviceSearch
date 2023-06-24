fetch('blender-open-data.json')
  .then(response => response.json())
  .then(data => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const copyNotification = document.getElementById('copyNotification');

    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = Object.keys(data).filter(key => key.toLowerCase().includes(searchTerm));

      displayResults(filteredData);
    });

    function displayResults(results) {
      searchResults.innerHTML = '';

      if (results.length === 0) {
        searchResults.innerHTML = 'No hay resultados. Completa el benchmark de <a href="https://opendata.blender.org/">https://opendata.blender.org/</a>';
      } else {
        results.forEach(result => {
          const resultItem = document.createElement('p');
          resultItem.innerHTML = result + ": " + data[result];
          resultItem.addEventListener('click', () => {
            copyToClipboard(resultItem.innerText);
            showCopyNotification();
          });
          searchResults.appendChild(resultItem);
        });
      }
    }

    function copyToClipboard(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    function showCopyNotification() {
      copyNotification.style.display = 'block';
      setTimeout(() => {
        copyNotification.style.display = 'none';
      }, 2000);
    }
  })
  .catch(error => {
    console.log('Error al cargar el JSON:', error);
  });
