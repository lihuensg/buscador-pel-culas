document.getElementById('searchButton').addEventListener('click', searchMovies)

let api_key = '4eabbaa8fd941b0c5f1300d95fa9c3b4' 
let urlBase = 'https://api.themoviedb.org/3/search/movie'
let urlImg = 'https://image.tmdb.org/t/p/w200'
let language = 'es';

let resultContainer = document.getElementById('results')

function searchMovies(){
    resultContainer.innerHTML = 'Cargando...'
    let searchInput = document.getElementById('searchInput').value

    fetch(`${urlBase}?query=${searchInput}&api_key=${api_key}&language=${language}`)
    .then(response => response.json())
    .then(response => {
        // Ordenar películas por fecha de lanzamiento (release_date)
        const sortedMovies = response.results.sort((a, b) => {
            return new Date(a.release_date) - new Date(b.release_date);
        });

        displayMovies(sortedMovies);
    });
}

function displayMovies(movies){
    resultContainer.innerHTML = ''

    if(movies.length === 0){
        resultContainer.innerHTML = '<p> No se encontraron resultados para tu búsqueda </p>'
        return
    }

    movies.forEach(movie => {
        //Creacion del div para cada pelicula 
        let movieCard = document.createElement('div')
        movieCard.classList.add('movie-card')

        //Titulo
        let title = document.createElement('h2')
        title.textContent = movie.title

        //Fecha lanzamiento
        let releaseDate = document.createElement('p')
        releaseDate.textContent = 'Fecha Lanzamiento: ' + movie.release_date

        //Descripción
        let overview = document.createElement('p')  
        overview.textContent = movie.overview

        //Imagen
        let posterPath = urlImg + movie.poster_path
        let poster = document.createElement('img')
        poster.src = posterPath 
        
        //Añadir al div de la película
        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(releaseDate);
        movieCard.appendChild(overview);

        //Añadir al div con id results
        resultContainer.appendChild(movieCard)
        
    });

}