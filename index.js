import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature') // BG IMG
    .then(res => res.json())
    .then(data => {
        
        // console.log(data.user)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
        document.getElementById('author').textContent = `by: ${data.user.name}`
    })

    .catch(err => {
        document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
    
    })


fetch('https://api.coingecko.com/api/v3/coins/bitcoin') // BITCOIN 
    .then(res => res.json())
    .then(data => {
        console.log(data.market_data.current_price.usd) // CURRENT PRICE
        console.log(data.market_data.high_24h.usd) // HIGH 24h
        console.log(data.market_data.low_24h.usd) // LOW 24h

        document.getElementById('bitcoin').innerHTML = `
            <h1>₿ Bitcoin</h1>
            <p>🎯 $${data.market_data.current_price.usd}</p>     
            <p>👆 $${data.market_data.high_24h.usd}</p> 
            <p>👇 $${data.market_data.low_24h.usd}</p> 
        `

    })
    .catch((err) => console.error(err))

    let listItems = []

document.addEventListener('click', (e) => {
    if(e.target.textContent == 'remove'){
        listItems = listItems.filter(item => item.id !== e.target.id)
        localStorage.setItem('item',JSON.stringify(listItems))
        renderTodos()
    }
    else if(e.target.id == 'btn'){
        let inputTagEl = document.getElementById('inputtag')
        if(inputTagEl.value){
            listItems.unshift({value:`${inputTagEl.value}`, id: `${uuidv4()}`})
            localStorage.setItem('item',JSON.stringify(listItems))
            renderTodos()
        
            inputTagEl.value=''
        }
    }
})
    


navigator.geolocation.getCurrentPosition((position) => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=00ba0d36a75390721db30c9707e01d80&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log(data.main.temp)
            console.log(data.name)
            console.log(data.weather[0].icon)
            //data.main.temp
            document.getElementById('weather').innerHTML = `
                <div class='weather-first-row'>
                    <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' />
                    <p>${Math.round(data.main.temp)}</p>
                </div>
                <p>${data.name}</p> 
            `
        })
        .catch((err) => console.error(err))

})



/* ADDING TIME */


function time(){
    const date = new Date()
    document.getElementById('time').textContent = `${date.toLocaleTimeString("en-us", {timeStyle: "short"})}`
}

setInterval(time,1000)



/* SETTING UP THE NEWS */

fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=MyGudGl9bqufHnkaLQln7EN9U38DlcWX')
    .then(res => res.json())
    .then(data => {
        console.log(data.results[0].title) // TITLE OF THE NEWS
        console.log(data.results[0].url) // URL OF THE NEWS

        document.getElementById('news').innerHTML = `
            <a href='${data.results[0].url}'target="_blank">${data.results[0].title}</a>
        `
    })
    .catch((err) => console.error(err))


    function getFeedHtml(item){
        let feedHtml = ''
        let local = JSON.parse(localStorage.getItem('item'))
        for(let item of local){
            feedHtml += `
                        <div class='inputs'>
                            <p>${item.value}</p>  
                            <button class="remove-btn" id="${item.id}">remove</button>
                        </div>
                    `
        }
        return feedHtml
    }


    
    function renderTodos(){
        document.getElementById('feed').innerHTML = getFeedHtml()
    }