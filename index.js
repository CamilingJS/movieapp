const autoCompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster; 
        return `
        <img src="${imgSrc}" />
        ${movie.Title} (${movie.Year})
        `;
    }, 
    inputValue(movie){
        return movie.Title; 
    }, 
    async fetchData(searchTerm) {
        const response = await axios.get('https://www.omdbapi.com/', {
            params: {
                apikey: '5be6879',
                s: searchTerm
            }
        });
        if (response.data.Error){
            return []; 
        }
    
        return response.data.Search; 
    }
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'), 
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#left-summary'));
    }, 
});
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'), 
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'));
    }, 
});


const onMovieSelect = async (movie, summaryElement) => {
    const response = await axios.get('https://www.omdbapi.com/', {
        params: {
            apikey: '5be6879',
            i: movie.imdbID, 
        }
    });
    
    summaryElement.innerHTML = movieTemplate(response.data);
};

const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const imbdRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseFloat(movieDetail.imdbVotes.replace(/,/g, ''));

 
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        if(isNaN(value)){
            return prev; 
        } else{
            return prev + value; 
        }
    }, 0)
    console.log(awards)
    

    return `
        <article class="media>
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>

            </figure>

            
        </article>

        <article>
        <div class="media-content">
        <div class="content">
            <h1>${movieDetail.Title}</h1>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
        </div>
    </div>
        </article>

        <article>
         </artice>
        <article class="notification is-primary">
            <p data-value=${awards} class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p data-value=${dollars}  class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p data-value=${metascore} class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p data-value=${imbdRating} class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p data-value=${imdbVotes} class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Actors}</p>
            <p class="subtitle">Actors</p>
        </article>
    `;
};