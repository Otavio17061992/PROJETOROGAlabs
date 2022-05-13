
const data = Array.from ({ length: 100})
    .map((_, i) => `Item${(i + 1)}`)



// ============================================= Aplicação =================================//
let perPage = 4
const state = {
    page: 1,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    maxVisibleButtons: 5
}
const html = {
    get(element) {
        return document.querySelector(element)
    }
}



/* ===================== Criação dos controles de navegação ==================== */
const controls = {
    next() {
        state.page++

        const lastPage = state.page > state.totalPage
        if(lastPage) {
            state.page--
        }
    },
    prev() {
        state.page--


        if (state.page < 1) {
            state.page++
        }
    },
    goTo(page) {
        if ( page < 1){
            page = 1
        }
        state.page = +page // transforma a page em numero

        if(page > state.totalPage){
            state.page = state.totalPage
        }
    },
    createListeners() {
        html.get('.first').addEventListener('click', () => {
            controls.goTo(1)
            update()
        })

        html.get('.last').addEventListener('click', () => {
            controls.goTo(state.totalPage)
            update()
        })

        html.get('.next').addEventListener('click', () => {
            controls.next()
            update()
        })
        html.get('.prev').addEventListener('click', () => {
            controls.prev()
            update()
        })
    }
}




/* ============================ integrando a  paginação  com a navegação ================ */

const list = {
    create(item) {
        const div = document.createElement('div')
        div.classList.add('item')
        div.innerHTML = item

        html.get('.list').appendChild(div)
    },
    update() {
        html.get('.list').innerHTML = ''

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage
        
        const paginatedItems = data.slice(start, end)

        paginatedItems.forEach(list.create) // para cada item cria uma função 

    }
}


/* ===================== criação e implementação dos botões ====================== */

const buttons = {
    element: html.get('.list-pagination .numbers'),
    create(number,caracter) {
        const button = document.createElement('li')
        const doot = document.createElement('li') // cria os doot (...) se numero maior que 3

        doot.innerHTML = caracter;
        button.innerHTML = number;

        if(number >= 3) {
            doot.classList.add('active')

        }



        if (state.page == number) {
            button.classList.add('active')
        }

        button.addEventListener('click', (event) => {
            const page = event.target.innerText

            controls.goTo(page)
            update()
        })


        
        buttons.element.appendChild(button)
        
        

    },


    update() {
        buttons.element.innerHTML = "" 
        const {maxLeft, maxRight} = buttons.calculateMaxVisible()

        for(let page = maxLeft; page <= maxRight; page++) {
            buttons.create(page)
        }
    },
    calculateMaxVisible() {
        const { maxVisibleButtons } = state
        let maxLeft = (state.page - Math.floor(maxVisibleButtons / 2))
        let maxRight = (state.page + Math.floor(maxVisibleButtons / 2))

        if(maxLeft < 1) {
            maxLeft = 1
            maxRight = maxVisibleButtons
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (maxVisibleButtons - 1)
            maxRight = state.totalPage
            
            if (maxLeft < 1) maxLeft = 1

        }
        return {maxLeft, maxRight}
    }
}





function update() {
    list.update()
    buttons.update()
}

function init() {
    list.update()
    update()
    controls.createListeners()
}


init()