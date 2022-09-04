const url =`https://openapi.programming-hero.com/api/news/category/01`
fetch(url)
    .then(res => res.json())
    .then(data => loaddata(data.data))

// function displayData(data) {
//     const div = document.getElementById('header')
//     data.forEach(element => {
//         const a=document.createElement('a')
//         console.log(element)
//         a.innerHTML = `
//             <a href="#"class="px-4 anchor">${element.category_name}</a>
//         `
//         div.appendChild(a)
//     });
// }
const loaddata = (data) => {
    const div = document.getElementById('news-container')
    data.forEach(element => {
        console.log(element)
        const news = document.createElement('div')
        news.innerHTML = `
            <div class="row g-2 my-4">
                    <div class="col-md-2">
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
}