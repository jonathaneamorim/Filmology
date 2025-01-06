const primeiraLista = ['tt4158110', 'tt2084970', 'tt5113044', 'tt4154756', 'tt2872732', 'tt26684398', 'tt0825677', 'tt8790086', 'tt15398776', 'tt6263850'];

var campoPesquisa = document.querySelector('#search');
var botaoPesquisar = document.querySelector('#searchButton');
var filmList = document.querySelector('#filmList');
var bodyName = document.querySelector('#bodyName');

const options = {method: 'GET', headers: {accept: 'application/json'}};

const verificaVazios = (data) => {
    if(data == 'N/A')
        return 'Value not found!';
    return data;
}

var card = (urlImage, title, plot, director, released, rating) => {
    var text = `<div class="card">
                    <img src="${verificaVazios(urlImage)}" class="card-img-top" width="150px" height="300px" alt="${verificaVazios(title)}">
                    <div class="card-body flex-column d-flex justify-content-between">
                        <h5 class="fs-3">${verificaVazios(title)}</h5>
                        <p class="card-text">${verificaVazios(plot)}</p>
                        <p class="card-text">Director: ${verificaVazios(director)}</p>
                        <p class="card-text">Release: ${verificaVazios(released)}</p>
                        <p class="card-text">IMDB Rating: ${verificaVazios(rating)}</p>
                    </div>
                </div>`;
    
    filmList.innerHTML += text;
};

const searchFilm = () => {
    fetch(`http://www.omdbapi.com/?s=${campoPesquisa.value}&apikey=710681c`, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.Response === 'False') {
                filmList.innerHTML = `
                    <div class="w-100 d-flex justify-content-center align-items-center">
                        <div class="w-50 d-flex flex-column align-items-center justify-content-center">
                            <p class="fst-italic">No results found!</p> 
                            <img class="w-100  rounded-circle" src="https://media.istockphoto.com/id/1225830150/vector/a-dog-with-404-error-page-not-found-template-for-webpage-landing-page-illustrator-vector.jpg?s=612x612&w=0&k=20&c=g09yYmgraFKc-2OPKludA9xKIxWCP3YYrufBxNBQhYw=" alt="not found">
                            <a class="m-3 text-decoration-none btn btn-dark" href="/">Voltar ao inicio</a>
                        </div>
                    </div>
                    `;
            } else {
                for(let i = 0; i < res.Search.length; i++) {
                    fetch(`http://www.omdbapi.com/?i=${res.Search[i].imdbID}&apikey=710681c`, options)
                        .then(resFilm => resFilm.json())
                        .then(resFilm => {
                            card(resFilm.Poster, resFilm.Title, resFilm.Plot, resFilm.Director, resFilm.Released, resFilm.imdbRating);
                        })
                        .catch(err => console.log(err));
                }
            }
        })
        .catch(err => console.error(err));
}

botaoPesquisar.addEventListener('click', () => {
    bodyName.innerHTML = 'RESULT OF SEARCH';
    filmList.innerHTML = '';
    searchFilm();
})

document.addEventListener('DOMContentLoaded', () =>  {
    bodyName.innerHTML = 'FEATURED MOVIES';
    primeiraLista.forEach(film => {
        fetch(`http://www.omdbapi.com/?i=${film}&apikey=710681c`, options)
            .then(res => res.json())
            .then(res => card(res.Poster, res.Title, res.Plot, res.Director, res.Released, res.imdbRating))
            .catch(err => {
                console.log(err);
                window.alert(err);
            })
    });
})


// Tentativa de traduzir os textos vindos da API
// const traduzir = async (data) => {
//     const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';

//     const optionsTraducao = {
//         method: 'POST',
//         headers: {
//             'x-rapidapi-key': 'b3e17f3b76msha77d099b849d063p111696jsn9ba65e03e31e',
//             'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             q: data,
//             source: 'en',
//             target: 'pt'
//         })
//     };

//     try {
//         const response = await fetch(url, optionsTraducao);
//         const result = await response.json();
//         console.log(result.data.translations.translatedText);
//         return result.data.translations.translatedText;
//     } catch (error) {
//         console.log(error);
//     }
// }