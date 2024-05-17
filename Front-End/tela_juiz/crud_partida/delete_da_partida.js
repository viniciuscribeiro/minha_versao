document.addEventListener('DOMContentLoaded', function() {
    // Obter o campo de ID da Partida
    const idPartidaInput = document.getElementById('id').value;

    // Obter o ID da partida da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPartidaFromURL = urlParams.get('id');

    // Preencher o campo "ID" com o valor da URL, se disponível
    if (idPartidaFromURL) {
        idPartidaInput.value = idPartidaFromURL;
    }

    // Adicionar evento de submissão ao formulário
    document.getElementById('partidaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter o ID da partida a ser excluído do campo de texto
        const idPartidaParaExcluir = parseInt(document.getElementById('id').value);

        // Chamar a função para excluir a partida
        await excluirAtleta(idPartidaParaExcluir);
    });

    async function excluirAtleta(match_id) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/match/${match_id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Partida excluída com sucesso!');
                alert('Partida excluída com sucesso!');
                // Faça algo após a exclusão, se necessário
            } else {
                console.error('Erro ao excluir Partida:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir Partida:', error);
        }
    }
});
