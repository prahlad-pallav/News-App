let searchButton = document.querySelector('.search-btn');
let searchText = document.querySelector('.news-input');

const API_Key ='390f8ae808e87049241bcacefe8844d0';

const url ='https://gnews.io/api/v4/search?q=';

window.addEventListener('load', () => News('politics'));
function reload(){
    window.location.reload(); 
}


async function News(query){
    let response = await fetch(`${url}${query}&apikey=${API_Key}`);
    let data = await response.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.querySelector('#cards-container');
    const newsCardTemplate = document.querySelector('#template-news-card');

    cardContainer.innerHTML='';

    articles.forEach(article => {
        if(!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        dataFilling(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function dataFilling(cardClone, article){
    let newsImg = cardClone.querySelector('#news-img');
    let newsTitle = cardClone.querySelector('#news-title');
    let newsSource = cardClone.querySelector('#news-source');
    let newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone :'Asia/Jakarta'
    });
    
    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener('click', () =>{
        window.open(article.url, "_blank");
    })

}

searchButton.addEventListener('click', () =>{
    let query = searchText.value;
    if(query === "") return;
    else{
        try{
            News(query);
        }
        catch(e){
            alert("Invalid Search!");
        }
    }
})

