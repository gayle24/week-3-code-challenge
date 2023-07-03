fetch(' http://localhost:3000/films')
.then((resp)=> resp.json)
.then((movies)=> console.log(movies))