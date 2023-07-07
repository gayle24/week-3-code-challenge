let ul = document.getElementById("films");
let main = document.getElementById('main');

let buy = document.querySelector('button');
let available = document.querySelector('#available');
let rem = 3;
available.innerHTML = `Tickets Available: ${rem}`;


buy.innerHTML = "Buy Now";

buy.addEventListener('click', () => {
  rem -= 1;
  
  if (rem > 0) {
    available.innerHTML = `Tickets Available: ${rem}`;
  } else {
    available.innerHTML = `Tickets Available: 0`;
    buy.innerHTML = "Sold Out";
    buy.disabled = true; // Disable the button when it's sold out
  }
});



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
                disp.setAttribute("class", "disp")
                let poster = document.createElement('img')
                poster.src = film.poster
                disp.appendChild(poster)
                
                let description = document.createElement('p')
                description.innerHTML = 'Description: ' + film.description
                disp.appendChild(description)

                let runtime = document.createElement('p')
                runtime.innerHTML = 'Runtime: ' + film.runtime + ' minutes'
                disp.appendChild(runtime)


                let sold = film.tickets_sold;
                let capacity = film.capacity;
                let rem = capacity - sold;

                let available = document.createElement('p');
                available.innerHTML = `Tickets Available: ${rem}`;
                disp.appendChild(available);

                let buy = document.createElement('button');
                buy.innerHTML = "Buy Now";
                buy.addEventListener('click', () => {
                rem -= 1;

                if (rem > 0) {
                    available.innerHTML = `Tickets Available: ${rem}`;
                } else {
                    available.innerHTML = `Tickets Available: 0`;
                    buy.innerHTML = "Sold Out";
                    buy.disabled = true; // Disable the button when it's sold out
                }
                });

                disp.appendChild(buy);


                main.appendChild(disp)
                
                
            })
        })
    });
})