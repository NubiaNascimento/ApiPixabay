'use strict'

// const que guarda a url da API

const urlApi = async (imagem) =>
{
    const chaveApi = 'key=24138722-b6a14ee25efce8f07fce08388'
    const url = `https://pixabay.com/api/?${chaveApi}&q=${imagem}&image_type=photo&pretty=true&lang=pt`
    const response = await fetch(url);
    const data = await response.json(url);
    return data
}

// const para realizar  pesquisa das imagens

const pesquisarImagens =  async (evento) =>
{
    if(evento.key === 'Enter')
    {
       const imagemPesquisa = evento.target.value
       const guardarResultado = await urlApi(imagemPesquisa)
       const resultado = guardarResultado.hits
       console.log(resultado)
       limparElementos(document.querySelector('.container'))

       carregarResultados(resultado)


    }
    
}

// const que limpa os elementos já pesquisados

const limparElementos = (elemento) => 
{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild)
    }
}


// conforme as imagens vão aparecendo, os cards vão mantendo elas dentro

const criarItem = urlApi => 
{
    const container = document.querySelector(".container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add('card')
    novaDiv.innerHTML = 
    `<a href="${urlApi.pageURL}" target="_blank">
        <img src = "${urlApi.largeImageURL}">
        <div class="descImagem">
            ${urlApi.tags}
            <div>
                <ion-icon class="icons" name="heart"></ion-icon>${urlApi.likes}
                <ion-icon name="chatbox-outline"></ion-icon>${urlApi.comments}
                <ion-icon name="bookmark"></ion-icon>
            </div>
            
        </div>
    
    
    </a>`
    
    container.appendChild(novaDiv)
}

const carregarResultados = (urlApi) => urlApi.forEach(criarItem);

document.querySelector('.input').addEventListener('keypress',pesquisarImagens)
