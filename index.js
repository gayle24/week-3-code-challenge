let ul = document.getElementById("sidebar");
let main = document.getElementById('main');


function displayContent(id){
    return fetch(`http://localhost:3000/films/${id}`)
    .then((resp)=> resp.json)
}
fetch("http://localhost:3000/films")
.then((resp)=> resp.json())
.then((films)=> {
    
    films.forEach(film => {
        let list = document.createElement('li');
        list.textContent = film.title;
        ul.appendChild(list)
        list.addEventListener('click', ()=>{
            displayContent(film.id)
            .then((data)=>{
                main.innerHTML = '';
                let disp = document.createElement('div')
                let poster = document.createElement('img')
                poster.src = film.poster
                disp.appendChild(poster)
                
                let description = document.createElement('p')
                description.innerHTML = 'Description: ' + film.description
                disp.appendChild(description)

                let runtime = document.createElement('p')
                runtime.innerHTML = 'Runtime: ' + film.runtime
                disp.appendChild(runtime)
                let sold = film.tickets_sold
                let capacity = film.capacity
                let rem = capacity - sold

                let available = document.createElement('p')
                available.innerHTML = "Tickets Available: " + rem
                disp.appendChild(available)

                let buy = document.createElement('input')
                buy.setAttribute('type', 'submit')
                buy.setAttribute('value', 'Buy Now')
                buy.addEventListener('submit', ()=>{
                    let i = rem;
                    if(i >0){
                        --rem
                    } else{
                        available.innerHTML = "Sold Out"
                    }
                })
                disp.appendChild(buy)

                main.appendChild(disp)
                
                
            })
        })
    });
})