// Função para carregar a lista de atletas do arquivo JSON
function carregarAtletas() {
    return fetch('atletas.json')
        .then(response => response.json())
        .catch(error => console.error('Erro ao carregar atletas:', error));
}

// Variável global para armazenar a lista de atletas
let atletasDisponiveis;

// Carregar os atletas assim que o script for carregado
carregarAtletas()
    .then(atletas => {
        atletasDisponiveis = atletas;
    });

function autoCompletarAtleta(input) {
    const nomeDigitado = input.value.toLowerCase();
    const idInput = input.id.replace('Nome', 'Id');
    const idInputElem = document.getElementById(idInput);

    const atletaEncontrado = atletasDisponiveis.find(atleta => atleta.nome.toLowerCase() === nomeDigitado);

    if (atletaEncontrado) {
        idInputElem.value = atletaEncontrado.id;
    } else {
        idInputElem.value = ''; // Limpa o campo de ID se o atleta não for encontrado
    }
}
