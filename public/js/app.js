const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const img = document.querySelector('#img')

//messageOne.textContent = 'From javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageTwo.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageTwo.textContent = data.error
        } else {
            img.src = data.weatherIcon
            messageOne.textContent = data.locationName
            messageTwo.textContent = data.forecast

        }
    })
})

})