const data = Array.from({ length: 100 }).map((_, i) => `Item ${i + 1}`);

// =============================== Aplicação app ======================//

const element = document.querySelector(".pagination ul");
let page = 1;
let perPage = 4;
let totalPages = Math.ceil(data.length / perPage);

const state = {
    page,
    perPage,
    totalPages,
};

const html = {
    get(element) {
        return document.querySelector(element);
    },
};

/* ============================== funcionalidade dos controles e navegação da pagina ============= */

const controls = {
    next() {
        state.page++;

        const lastPage = state.page > state.totalPages;
        if (lastPage) {
            state.page--;
        }
    },
    prev() {
        state.page--;

        if (state.page < 1) {
            state.page++;
        }
    },

    goTo(page) {
        if (page < 1) {
            page = 1;
        }
        state.page = +page; //transforma a page em número

        if (page > state.totalPages) {
            state.page = state.totalPages;
        }

        list.update();
    },
    createListeners() {
        if (html.get(".first-numb")) {
            html.get(".first-numb").addEventListener("click", () => {
                controls.goTo(1);
                update();
            });
        }

        if (html.get(".last-numb")) {
            html.get(".last-numb").addEventListener("click", () => {
                controls.goTo(state.totalPages);
                update();
            });
        }

        if (html.get(".btn-next")) {
            html.get(".btn-next").addEventListener("click", () => {
                controls.next();
                update();
            });
        }

        if (html.get(".btn-prev")) {
            html.get(".btn-prev").addEventListener("click", () => {
                controls.prev();
                update();
            });
        }
    },
};

function callBackNumb(plength) {
    createPagination(totalPages, plength);
    controls.goTo(plength);
    list.update();
}

/* ========================== cria os botões de navegação ===================== */

element.innerHTML = createPagination(totalPages, page); //chama a função com a passagem de parâmetros e adicionando o elemento interno que é a tag ul

function createPagination(totalPages, page) {
    let liTag = "";
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;

    if (page > 1) {
        //mostra o próximo botão se o valor da página for maior que 1
        liTag += `<li class="btn-prev btn prev" onclick="createPagination(totalPages, ${
            page - 1
        })"><span><i class="fas fa-angle-left"></i> <<</span></li>`;
    }

    if (page > 2) {
        //se o valor da página for menor que 2, adicione 1 após o botão anterior
        liTag += `<li class="first-numb first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
        if (page > 3) {
            //se o valor da página for maior que 3, adiciona o -> (...) após o primeiro li
            liTag += `<li class="dots"><span>...</span></li>`;
        }
    }

    // quantas páginas ou li mostram antes do li atual
    if (page == totalPages) {
        beforePage = beforePage - 2;
    } else if (page == totalPages - 1) {
        beforePage = beforePage - 1;
    }
    // quantas páginas ou li mostram após o li atual
    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage = afterPage + 1;
    }

    for (let plength = beforePage; plength <= afterPage; plength++) {
        if (plength > totalPages) {
            //se plength for maior que totalPage length então continua
            continue;
        }
        if (plength == 0) {
            //se plength é 0 então adiciona +1 no valor de plength
            plength = plength + 1;
        }
        if (page == plength) {
            //se a página for igual a plength, atribui  string ativa na variável ativa
            active = "active";
        } else {
            // senão deixa vazio para a variável ativa
            active = "";
        }
        // liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
        liTag += `<li class="numb ${active}" onclick="callBackNumb(${plength})"><span>${plength}</span></li>`;
    }

    if (page < totalPages - 1) {
        //se o valor da página for menor que o valor totalPage por -1, então mostra o último li ou página
        if (page < totalPages - 2) {
            //se o valor da página for menor que o valor totalPage por -2, então adicione -> (...) antes da última li
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        liTag += `<li class="last-numb last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    }

    if (page < totalPages) {
        //mostra o próximo botão se o valor da página for menor que totalPage
        liTag += `<li class="btn-next btn next" onclick="createPagination(totalPages, ${
            page + 1
        })"><span>>></span></li>`;
    }
    element.innerHTML = liTag; //adiciona a tag li dentro da tag ul

    controls.createListeners();

    return liTag; //retorna a tag li
}

/* ============= integrando a paginação com a navegação ================== */

const list = {
    create(item) {
        //cria minha div item
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = item;

        html.get(".list").appendChild(div);
    },
    update() {
        //coloca a div item vazia para receber a funcao create
        html.get(".list").innerHTML = "";

        const elementPerPage = list.createElementsPerPage(data, perPage);

        elementPerPage[state.page - 1].forEach(list.create); // para cada item cria uma função
    },

    createElementsPerPage(arr, len) {
        let parts = [];
        let = i = 0;
        let = n = arr.length;
        while (i < n) {
            parts.push(arr.slice(i, (i += len)));
        }
        return parts;
    },
};




function update() {
    list.update();
    buttons.update();
}

function init() {
    list.update();
    update();
    controls.createListeners();
}

init();
