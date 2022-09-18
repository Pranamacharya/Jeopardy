const game=document.getElementById('game')
const scoreDisplay=document.getElementById('score')
const jeopardycategories=[
    {
        genre:'WHO',
        questions:[
            {
                question:'Who wrote harry potter?',
                answers:['JK Rowling', 'JRR Talkien'],
                correct:'JK Rowling',
                level:'easy',
            },
            {
                question:'Who was born in krypton?',
                answers:['Aquaman', 'Superman'],
                correct:'Superman',
                level:'medium',
            },
            {
                question:'Who designed the first car?',
                answers:['Carl Benz', 'Henry Ford'],
                correct:'Carl Benz',
                level:'hard',
            }

        ],
    },
    {
        genre:'WHERE',
        questions:[
            {
                question:'Where is buckingham palace?',
                answers:['Richmond', 'London'],
                correct:'London',
                level:'easy'
            },
            {
                question:'Where is colosseum?',
                answers:['Rome', 'Milan'],
                correct:'Rome',
                level:'medium'
            },
            {
                question:'Where is Mount Kilimanjaro?',
                answers:['Zimbabwe', 'Tanzania'],
                correct:'Tanzania',
                level:'hard'
            },

        ],
    },
    {
        genre:'WHEN',
        questions:[
            {
                question:'When is christmas?',
                answers:['30th Dec', '24th/25th Dec'],
                correct:'24/25th Dec',
                level:'easy'
            },
            {
                question:'When was JFK shot?',
                answers:['1963', '1961'],
                correct:'1963',
                level:'hard'
            },
            {
                question:'When was WW2?',
                answers:['1932', '1941'],
                correct:'1941',
                level:'medium'
            },
        ],
    },
    {
        genre:'WHAT',
        questions:[
            {
                question:'What is the capital of Soudi Arabia?',
                answers:['Jeddah', 'Riyadh'],
                correct:'Riyadh',
                level:'hard'
            },
            {
                question:'What do Koalas eat?',
                answers:['Straw', 'Eucalypt'],
                correct:'Eucalypt',
                level:'medium'
            },
            {
                question:'What is a KG short for?',
                answers:['kiloJoul', 'kiloGram'],
                correct:'kiloGram',
                level:'easy'
            },
        ],
    },
    {
        genre:'HOW MANY',
        questions:[
            {
                question:'How many Players in football team?',
                answers:['15', '11'],
                correct:'11',
                level:'easy'
            },
            {
                question:'How many seconds in an hour?',
                answers:['36000', '3600'],
                correct:'3600',
                level:'medium'
            },
            {
                question:'How many people in China?',
                answers:['1.1 bil', '1.4 bil'],
                correct:'1.4 bil',
                level:'hard'
            },
        ],
    },
]




let score=0

function addCategory(category){
    const column=document.createElement('div')
    column.classList.add('genre-column')

    const genreTitle=document.createElement('div')
    genreTitle.classList.add('genre-title')
    genreTitle.innerHTML=category.genre
    column.appendChild(genreTitle)
    game.append(column)


    category.questions.forEach(question=>{
        const card=document.createElement('div')
        card.classList.add('card')
        column.append(card)


        if (question.level=='easy'){
            card.innerHTML=100
        }
        if (question.level=='medium'){
            card.innerHTML=200
        }
        if (question.level=='hard'){
            card.innerHTML=300
        }

        card.setAttribute('data-question',question.question)
        card.setAttribute('data-answer-1',question.answers[0])
        card.setAttribute('data-answer-2',question.answers[1])
        card.setAttribute('data-correct',question.correct)
        card.setAttribute('data-value',card.getInnerHTML())


        card.addEventListener('click',flipcard)


    })


}

jeopardycategories.forEach(category=> addCategory(category))

function flipcard(){
    this.innerHTML=""
    this.style.fontSize="15px"
    this.style.lineHeight="12px"
    const textDisplay=document.createElement('div')
    textDisplay.classList.add('card-text')
    textDisplay.innerHTML=this.getAttribute('data-question')
    const firstbutton=document.createElement('button')
    const secondbutton=document.createElement('button')

    firstbutton.classList.add('first-button')
    secondbutton.classList.add('second-button')
    firstbutton.innerHTML=this.getAttribute('data-answer-1')
    secondbutton.innerHTML=this.getAttribute('data-answer-2')
    firstbutton.addEventListener('click',getResult)
    secondbutton.addEventListener('click',getResult)

    this.append(textDisplay,firstbutton,secondbutton)

    const allCards=Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card=>card.removeEventListener('click',flipcard))
}

function getResult(){
    const allCards=Array.from(document.querySelectorAll('.card'))
    allCards.forEach(card=>card.addEventListener('click',flipcard))
    const cardOfButton=this.parentElement
    if(cardOfButton.getAttribute('data-correct')==this.innerHTML){
        score=score+parseInt(cardOfButton.getAttribute('data-value'))
        scoreDisplay.innerHTML=score
        cardOfButton.classList.add('correct-answer')
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML=cardOfButton.getAttribute('data-value')
        },100)
    }
    else{
        cardOfButton.classList.add('wrong-answer')
        setTimeout(()=>{
            while(cardOfButton.firstChild){
                cardOfButton.removeChild(cardOfButton.lastChild)
            }
            cardOfButton.innerHTML=0
        },100)
    }

    cardOfButton.removeEventListener('click',flipcard)

}