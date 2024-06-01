// Fetch the list of movies and populate the select box
fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: '{ movies { title } }' }),
  })
  .then(response => response.json())
  .then(data => {
    const movieSelect = document.getElementById('movieSelect');
    data.data.movies.forEach(movie => {
      const option = document.createElement('option');
      option.value = movie.title;
      option.text = movie.title;
      movieSelect.appendChild(option);
    });
  })
  .catch(error => console.error('Error fetching movies:', error));
  
  // Fetch and display details of the selected movie
  document.getElementById('movieSelect').addEventListener('change', (event) => {
    const title = event.target.value;
    if (title) {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: `{ movie(title: "${title}") { title, director, year } }` }),
      })
      .then(response => response.json())
      .then(data => {
        const result = data.data.movie;
        document.getElementById('result').innerText = `Título: ${result.title}\nDirector: ${result.director}\nAño: ${result.year}`;
      })
      .catch(error => console.error('Error fetching movie details:', error));
    } else {
      document.getElementById('result').innerText = '';
    }
  });
  