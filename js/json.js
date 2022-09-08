
const loadNews = async () => {
    const link = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(link)
    const data = await res.json()
    displayData(data.data.news_category)
}

try {
    loading()
} catch (error) {
    console.log(error);
} finally {
    console.log('Congratulations ! No error.');
}
let title
loadNews()
loading(01,'Breaking News')
function displayData(data) {
    const head = document.getElementById('header')
    data.forEach(element => {
        const a = document.createElement('a')
        a.innerHTML = `
            <a class="anchor btn btn-outline-dark mx-4" onclick="loading(${element.category_id},'${element.category_name}')">${element.category_name}</a>
        `
        head.appendChild(a)
    });
}

function toggleSpinner(isLoading){
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

function loading(id,name) {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => loaddata(data.data,name))
}
const loaddata = (data, name) => {
    const div = document.getElementById('news-container')
    data.sort((a, b) => {
        return b.total_view-a.total_view
    })
    console.log(data)
    div.textContent = ''
    if (data.length == 0) {
        const warning = document.createElement('h3')
        warning.innerHTML = `
            <h3 class="m-5 text-primary">Sorry! No News found for<span class="text-secondary"> ${name}</span> section</h3>
        `
        div.appendChild(warning)
    }
    else {
        const count = document.createElement('h4')
        count.innerHTML = `
            <h4 class="my-5 mx-2">${data.length} News available for <span class="text-success"> ${name} </span> !</h4>
        `
        div.appendChild(count)
    }
    data.forEach(element => {
        const news = document.createElement('div')
        news.innerHTML = `
            <div class="row g-2 my-4">
                <div class="col-md-2 mx-3">
                    <img src="${element.thumbnail_url}" class="img-fluid rounded-start" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="">
                            <h5 class="card-title">${element.title}</h5>
                            <p class="details" data-bs-toggle="modal" data-bs-target="#newsModal" onclick="displayModal('${element._id}')">${element.details}</p>
                        </div>
                        <div class="mt-4  d-flex flex-row">
                            <img src="${element.author.img}" class="author mx-2">
                            <div clss="mr-5">
                                <h6 class="mb-0">${element.author.name?element.author.name:'No name'}</h6>
                                <p class="text-secondary">${element.author.published_date?element.author.published_date:'No date found'}</p>
                            </div>
                            <div class="d-flex flex-row views">
                                <i class="fa-solid fa-eye-slash ml-5"> </i>
                                <h6 class="mr-5">&nbsp;${element.total_view?element.total_view:'no views'}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        div.appendChild(news)
    });
    toggleSpinner(false)
}

const displayModal = async id => {
    const news_link = `https://openapi.programming-hero.com/api/news/${id}`
    const res =await fetch(news_link)
    const news_data = await res.json()
    show_newsModal(news_data.data)
}

function show_newsModal(data) {
    console.log(data)
    data.forEach(element => {
        const d = document.getElementById('modalImg')
        d.innerHTML = `
            <img src="${element.image_url}" class="modal-img mb-2">
        `
        document.getElementById('modalTitle').innerText = element.title
        document.getElementById('modalDetails').innerText = element.details
        document.getElementById('author').innerText = (element.author.name?element.author.name:'No name')
        document.getElementById('publish-date').innerText=element.author.published_date?element.author.published_date:'No date found'
    });
}