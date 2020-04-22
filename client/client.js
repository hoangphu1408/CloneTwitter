console.log("Hello");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElemnet = document.querySelector('.mews');
const API_URL = 'http://localhost:5000/mews';

loadingElement.style.display = 'none';

listALlMews();


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content
    };
    loadingElement.style.display = '';
    form.style.display = 'none';
    fetch(API_URL, {
        method:'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(createdMew =>{
          form.reset();
          listALlMews();
          loadingElement.style.display = 'none';
      });
})

function listALlMews(){
    mewsElemnet.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(mews =>{
            mews.reverse();
            mews.forEach( mew => {
                const div = document.createElement('div');

                const header = document.createElement('h3');
                header.textContent = mew.name;


                const content = document.createElement('p');
                content.textContent = mew.content;

                const date = document.createElement('small');
                date.textContent = new Date(mew.created);

                div.appendChild(header);
                div.appendChild(content);
                div.appendChild(date);

                mewsElemnet.appendChild(div);
            })
        })
        form.style.display = '';
}