// ELEMENTS

const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetail = document.querySelector('#ramen-detail')
const ramenForm = document.querySelector('#ramen-rating')


// FUNCTIONS

function addMenuImg(ramenType) {
    const newImg = document.createElement('img')
    newImg.dataset.id = ramenType.id
    newImg.src = ramenType.image
    ramenMenu.appendChild(newImg)
}

fetch('http://localhost:3000/ramens')
    .then(r => r.json())
    .then(ramenTypes => {
        ramenTypes.forEach(elt => {
            addMenuImg(elt)
        })
    })

function displayInfo(ramenType) {
    ramenDetail.querySelector('img').src = ramenType.image
    ramenDetail.querySelector('img').setAttribute('alt', ramenType.name)
    ramenDetail.querySelector('h2').textContent = ramenType.name
    ramenDetail.querySelector('h3').textContent = ramenType.restaurant

    ramenForm.dataset.id = ramenType.id
    ramenForm.querySelector('input#rating').value = ramenType.rating
    ramenForm.querySelector('textarea#comment').value = ramenType.comment
}


// EVENT LISTENERS

ramenMenu.addEventListener('click', (event) => {
    if (event.target.dataset.id) {        
        fetch(`http://localhost:3000/ramens/${event.target.dataset.id}`)
            .then(r => r.json())
            .then(ramenType => displayInfo(ramenType))
    }
})

ramenForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let inputRating = ramenForm.querySelector('input#rating').value
    let inputComment = ramenForm.querySelector('textarea#comment').value

    console.log(ramenForm.dataset.id)
    fetch(`http://localhost:3000/ramens/${ramenForm.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: inputRating, comment: inputComment })
    })
        .then(r => r.json())
        .then(data => console.log(data))
})