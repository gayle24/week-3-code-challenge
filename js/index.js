fetch('js/moviedb.json')
.then((resp)=> resp.json)
.then((movies)=> console.log(movies))