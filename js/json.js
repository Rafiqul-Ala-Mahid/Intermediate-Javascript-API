const loadNews=async()=>{
    const link = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(link)
    const data = await res.json()
    displayData(data.data.news_category)
}
loadNews()
function displayData(data) {
    const head = document.getElementById('header')
    // console.log(data)
    data.forEach(element => {
        // console.log(element)
        const a = document.createElement('a')
        a.innerHTML = `
            <a href="#" class="anchor mx-4 refer" onclick="loading(${element.category_id})">${element.category_name}</a>
        `
        head.appendChild(a)
    });
}
function loading(id) {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => loaddata(data.data))
}



const loaddata = (data) => {
    const div = document.getElementById('news-container')
    div.textContent = ''
    if (data.length == 0) {
        const warning = document.createElement('h3')
        warning.innerHTML = `
            <h3 class="m-5 text-primary">Sorry! No News found for this section</h3>
        `
        div.appendChild(warning)
    }
    else {
        const count = document.createElement('h4')
        count.innerHTML = `
            <h4 class="my-5 mx-2">${data.length} News available here !</h4>
        `
        div.appendChild(count)
    }
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
                            <p class="card-text details">${element.details}</p>
                        </div>
                        <div class="mt-4 d-flex flex-row">
                            <img src="${element.author.img}" class="author mx-2">
                            <div>
                                <h6 class="mb-0">${element.author.name}</h6>
                                <p class="text-secondary">${element.author.published_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
        div.appendChild(news)
    });
}