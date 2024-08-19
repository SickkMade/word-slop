let word = document.querySelector('#word')
let one = document.querySelector('#one')
let two = document.querySelector('#two')

async function API(){
    const wordReq = await fetch('https://random-word-api.herokuapp.com/word?lang=en')
    
    const Randomword = await wordReq.json()
    const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+Randomword[0])
    const data = await response.json();

    if(!data[0]) API()
    else{
        const wordReq2 = await fetch('https://random-word-api.herokuapp.com/word?lang=en')
        const randomWord2 = await wordReq2.json()
        two.textContent = randomWord2[0]
        word.textContent = data[0]['word']
        one.textContent = data[0]["meanings"][0]["definitions"][0].definition
    }
    
}

API()