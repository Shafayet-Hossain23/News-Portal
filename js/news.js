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
        <p id="item-mouse-style" onclick="loadItemsFound('${category.category_id}','${category.category_name}')">${category.category_name}</p>
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
    // console.log(categoryName);
    const itemsFoundContainer = document.getElementById('items-found-container');
    itemsFoundContainer.innerText = `${categories.length} items found  for category ${categoryName}
    `
}









loadCategories();