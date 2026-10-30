const contentDiv = document.getElementById("content");
const catalogLink = document.getElementById("catalog-link");

function loadCatalog() {
    fetch("categories.json")
        .then(response => response.json())
        .then(categories => {
            let html = "<h2>Категорії каталогу</h2>";

            categories.forEach(cat => {
                html += `<a class="cat-link" onclick="loadCategory('${cat.shortname}')">${cat.name}</a>`;
                if (cat.notes) {
                    html += `<small>${cat.notes}</small>`;
                }
            });

            // Посилання Specials (випадкова категорія через Math.random)
            html += `<hr><a class="cat-link" onclick="loadSpecials()">Specials (Випадкова категорія)</a>`;
            contentDiv.innerHTML = html;
        });
}

// Завантаження товарів конкретної категорії
function loadCategory(shortname) {
    fetch(`${shortname}.json`)
        .then(response => response.json())
        .then(data => {
            let html = `<h2>${data.categoryName}</h2><div class="grid">`;

            data.items.forEach(item => {
                const imgUrl = `https://placehold.co/200x200?text=${encodeURIComponent(item.shortname)}`;
                html += `
                    <div class="card">
                        <img src="${imgUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <div class="price">${item.price}</div>
                    </div>
                `;
            });

            html += "</div>";
            contentDiv.innerHTML = html;
        });
}

function loadSpecials() {
    fetch("categories.json")
        .then(response => response.json())
        .then(categories => {
            const randomIndex = Math.floor(Math.random() * categories.length);
            loadCategory(categories[randomIndex].shortname);
        });
}

catalogLink.addEventListener("click", function (e) {
    e.preventDefault();
    loadCatalog();
});

loadCatalog();