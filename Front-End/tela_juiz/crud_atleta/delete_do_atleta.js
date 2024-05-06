document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter o ID do atleta a ser excluído do campo de texto
        const idAtletaParaExcluir = parseInt(document.getElementById('idAtletaParaExcluir').value);

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