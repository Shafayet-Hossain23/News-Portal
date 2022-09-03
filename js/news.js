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
        // console.log(category.category_name)
        const createDiv = document.createElement('div');
        createDiv.classList.add('category-all', 'mx-auto')
        createDiv.innerHTML = `
        <a href="">${category.category_name}</a>
        `;
        callCategoriesContainer.appendChild(createDiv);
    })

}
loadCategories();