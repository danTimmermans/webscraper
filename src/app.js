const feedDisplay = document.querySelector('#feed')

// on va chercher les resultats depuis le backend autrement dit localhost:8000/results (voir index.js)

fetch('http://localhost:8000/results')
.then(response => response.json())
.then(data => {
    data.forEach(article => {
        // const title = '<h3>' + article.title + '<h3>'
        // feedDisplay.insertAdjacentHTML("beforeend", title)
        const articleItem = `<div><h3>` + article.title + `</h3><a href="${article.url}">` + article.url + `</a></div>`
        feedDisplay.insertAdjacentHTML("beforeend", articleItem)
    });
})
.catch(err => console.log(err))