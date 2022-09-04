const loadNews=async()=>{
    const link = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(link)
    const data = await res.json()
    displayData(data.data.news_category)
}
loadNews()
function displayData(data) {
    const head = document.getElementById('header')
    data.forEach(element => {
        // console.log(element.category_name)
        const a = document.createElement('a')
        a.innerHTML = `
            <a href="#" class="anchor mx-4" onclick="loading(${element.category_id})">${element.category_name}</a>
        `
        head.appendChild(a)
    });
}
function loading(id) {
    console.log(id)
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => loaddata(data.data))
}



const loaddata = (data) => {
    const div = document.getElementById('news-container')
    data.forEach(element => {
        console.log(element)
        const news = document.createElement('div')
        news.innerHTML = `
            <div class="row g-2 my-4">
                    <div class="col-md-2 mx-3">
                        <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="card-text">${element.details}</p>
                        </div>
                    </div>
                </div>
        `
        div.appendChild(news)
    });
    news.innerHTML=``
}