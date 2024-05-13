document.addEventListener('DOMContentLoaded', function() {
    // Obter o campo de ID do atleta
    const idAtletaInput = document.getElementById('idAtleta');

    // Obter o ID do atleta da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idAtletaFromURL = urlParams.get('id');

    // Preencher o campo "ID" com o valor da URL, se disponível
    if (idAtletaFromURL) {
        idAtletaInput.value = idAtletaFromURL;
    }

    // Adicionar evento de submissão ao formulário
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter o ID do atleta a ser excluído do campo de texto
        const idAtletaParaExcluir = parseInt(document.getElementById('idAtleta').value);

        // Chamar a função para excluir o atleta
        await excluirAtleta(idAtletaParaExcluir);
    });

    async function excluirAtleta(idAtleta) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${idAtleta}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Atleta excluído com sucesso');
                alert('Atleta excluído com sucesso!');
                // Faça algo após a exclusão, se necessário
            } else {
                console.error('Erro ao excluir atleta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir atleta:', error);
        }
    }
});
