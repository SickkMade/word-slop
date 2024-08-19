let word = document.querySelector('#word')
let one = document.querySelector('#one')
let two = document.querySelector('#two')
let options = document.querySelector('#options')
let everything = document.querySelector('section')
let loading = document.querySelector('img')
let score = document.querySelector('#score')
let max = document.querySelector('#max')


let buttons = document.querySelectorAll('button')

buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        checkResult(button.textContent)
    })
})

let correct

async function API(){
    loading.classList.remove('invis')
    everything.classList.add('invis')

    const randomWord = await getWord()
    const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+randomWord)
    const data = await response.json();

    if(!data[0]) API()
    else{
        const randomWord = await getWord()

        if(Math.random() < .5){
            options.classList.add('reverse')
        }
        else{
            options.classList.remove('reverse')
        }

        loading.classList.add('invis')
        everything.classList.remove('invis')
        

        two.textContent = randomWord
        word.textContent = data[0]['word']
        one.textContent = data[0].meanings[0].definitions[0].definition
        correct = word.textContent
    }
    
}

async function getWord(){
    const wordReq = await fetch('https://random-word-api.herokuapp.com/word?lang=en')
    const Randomword = await wordReq.json()

    return Randomword[0]
}

function checkResult(textContent){
    API()

    let current = parseInt(localStorage.getItem('current'))
    let maxScore = parseInt(localStorage.getItem('max'))

    if(textContent === correct){
        alert('win')
        localStorage.setItem('current', ++current)
        if(current > maxScore) localStorage.setItem('max', current)
    }
    else if(textContent !== 'abc'){
        alert('lose')
        localStorage.setItem('current', 0)
    }

    score.textContent = current
    max.textContent = maxScore
}

if(!localStorage.getItem('current')){
    localStorage.setItem('current', 0)
    localStorage.setItem('max', 0)
}

checkResult('abc')