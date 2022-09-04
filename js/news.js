const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category
        ))
        .catch(error => console.log(error))
}
const displayCategories = (categories) => {
    const callCategoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        // console.log(category.category_id, category.category_name)
        const createDiv = document.createElement('div');
        createDiv.classList.add('category-all', 'mx-auto')
        createDiv.innerHTML = `
        <p id="item-mouse-style" onclick="loadItemsFound('${category.category_id}','${category.category_name}');spinLoader(true);">${category.category_name}</p>
        `;
        callCategoriesContainer.appendChild(createDiv);
    })

}
const loadItemsFound = (categoryId, categoryName) => {
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayItemFound(data.data, categoryName))
        .catch(error => console.log(error))
}
const displayItemFound = (categories, categoryName) => {
    // console.log(categories);
    const itemsFoundContainer = document.getElementById('items-found-container');
    itemsFoundContainer.innerText = `${categories.length} items found  for category ${categoryName}
    `;
    const callNewsContainer = document.getElementById('news-container');
    callNewsContainer.innerHTML = '';
    categories.forEach(categoryTitle => {
        // console.log(categoryTitle);
        const createDiv = document.createElement('div');
        createDiv.classList.add('row', 'g-0', 'my-5', 'bg-white', 'rounded-4', 'portal-container');
        // createDiv.setAttribute("onclick", `clickModalOpen('${categoryTitle._id}');`);
        createDiv.innerHTML = `
        
        <div class="col-md-4 news-images">
            <img style="width:350px;" src="${categoryTitle.thumbnail_url}" class="img-fluid rounded p-2 ">
        </div>
        <div class="col-md-8">
            <div class="card-body me-5 pe-5 mt-5 ">
                <h4 class="card-title  mt-3 fw-bold">${categoryTitle.title}</h4>
                <p style="text-align:justify;" class="card-text mt-3 pt-2">${categoryTitle.details.slice(0, 320)} ...</p>
                <div class="mt-4 d-flex justify-content-between">
                    <div class="d-flex">
                        <div>
                        <img style="width:40px;height:40px;" class="img-fluid rounded-circle" src="${categoryTitle.author.img}">
                        </div>
                        <div class="ms-2 mt-2"> 
                            <h6>${categoryTitle.author.name ? categoryTitle.author.name : 'No data found'}</h6>
                        </div>
                    </div>
                    <div>
                        <p class="fw-normal total-view"> <i class="fa-solid fa-eye"> </i>  ${categoryTitle.total_view ? categoryTitle.total_view : 'No data found'}</p>
                        
                    </div>
                    <div>
                       <button class="btn btn-primary" onclick="clickModalOpen('${categoryTitle._id}')" data-bs-toggle="modal" data-bs-target="#newsModal">Details <i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
            
        </div>
        
    
    `;
        callNewsContainer.appendChild(createDiv);
    })
    spinLoader(false);

}
const clickModalOpen = (newsId) => {
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch(error => console.log(error))
}
const displayModal = (news) => {
    console.log(news);
    const callNewsModalTitle = document.getElementById('newsModalLabel');
    callNewsModalTitle.innerText = `${news.title.slice(0, 48)}...`;
    const callModalBody = document.getElementById('news-modal-body');
    callModalBody.innerHTML = `
    <p>Published Date : ${news.author.published_date ? news.author.published_date.slice(0, 10) : 'No date found'}</p>
    <p>Author Name : ${news.author.name ? news.author.name : 'No data found'}</p>
    <p>views : ${news.total_view ? news.total_view : 'No data found'}</p>
    <p>Ratings : ${news.rating.number} (${news.rating.badge})</p>
    `

}
const spinLoader = (isLoading) => {
    const callLoader = document.getElementById('loader');
    if (isLoading) {
        callLoader.classList.remove('d-none');
    }
    else {
        callLoader.classList.add('d-none');
    }
}





loadItemsFound("08", "All News")


loadCategories();
