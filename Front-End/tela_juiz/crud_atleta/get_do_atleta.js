document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buscarAtletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const idAtleta = document.getElementById('idAtleta').value;
        if (idAtleta.trim() !== '') {
            // Se o campo de ID não estiver vazio, busca o atleta pelo ID
            await buscarAtletaPorId(idAtleta);
        } else {
            // Se estiver vazio, busca todos os atletas
            console.log('Buscando todos os atletas...');
            await buscarTodosAtletas();
        }
    });

    document.getElementById('buscarTodosAtletasForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        console.log('Buscando todos os atletas...');
        await buscarTodosAtletas();
    });

    async function buscarAtletaPorId(idAtleta) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${idAtleta}`);
            if (!response.ok) {
                throw new Error('Atleta não encontrado');
            }
            const data = await response.json();
            console.log('Atleta encontrado:', data);
            // Aqui você pode manipular os dados do atleta encontrado e exibi-los na página
        } catch (error) {
            console.error(error.message);
        }
    }

    async function buscarTodosAtletas() {
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/athletes');
            if (!response.ok) {
                throw new Error('Erro ao buscar todos os atletas');
            }
            const data = await response.json();
            console.log('Todos os atletas:', data);
            // Aqui você pode manipular os dados de todos os atletas e exibi-los na página
        } catch (error) {
            console.error(error.message);
        }
    }
});
