document.addEventListener('DOMContentLoaded', function() {
    // Chamada para buscar e exibir os dados dos atletas quando a página for carregada
    window.addEventListener('DOMContentLoaded', async function() {
        await buscarAtletasDaAPI();
    });

    // Função para buscar dados de atletas da API
    async function buscarAtletasDaAPI() {
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete');
            if (!response.ok) {
                throw new Error('Erro ao buscar dados dos atletas');
            }
            const data = await response.json();
            console.log('Dados dos atletas:', data);
            // Aqui você pode manipular os dados dos atletas e exibi-los na página
            // Por exemplo, você pode criar elementos HTML dinamicamente para exibir os dados
        } catch (error) {
            console.error(error.message);
        }
    }
});