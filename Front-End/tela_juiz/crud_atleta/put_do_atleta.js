document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter ID do atleta a ser atualizado
        const idAtleta = document.getElementById('idAtleta').value;

        // Obter os dados atuais do atleta
        const dadosAtuais = await buscarAtleta(idAtleta);

        // Obter valores dos campos do formulário
        const name = document.getElementById('nomeAtleta').value;
        const birth_date = document.getElementById('idadeAtleta').value;
        const height = parseInt(document.getElementById('alturaAtleta').value);
        const weight = parseInt(document.getElementById('pesoAtleta').value);
        const best_times = document.getElementById('bestTimes').value;
        const medal_history = document.getElementById('medalHistory').value;
        const specializations = document.querySelector('input[name="especializacaoAtleta"]:checked').value; 
        const country = document.getElementById('paisAtleta').value;
        const team = document.getElementById('equipeAtleta').value;
        const modality = document.getElementById('esporteAtleta').value;

        // Criar objeto com os dados atualizados
        const dadosAtualizados = {
            name: name !== '' ? name : dadosAtuais.name,
            birth_date: birth_date !== '' ? birth_date : dadosAtuais.birth_date,
            height: height !== '' ? height : dadosAtuais.height,
            weight: weight !== '' ? weight : dadosAtuais.weight,
            specializations: specializations !== '' ? specializations : dadosAtuais.specializations,
            country: country !== '' ? country : dadosAtuais.country,
            team: team !== '' ? team : dadosAtuais.team,
            modality: modality !== '' ? modality : dadosAtuais.modality,
            best_times: best_times !== '' ? best_times : dadosAtuais.best_times,
            medal_history: medal_history !== '' ? medal_history : dadosAtuais.medal_history
        };


        // Chamar a função para atualizar o atleta
        await atualizarAtleta(idAtleta, dadosAtualizados);
    });

    async function atualizarAtleta(idAtleta, dadosAtualizados) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${idAtleta}`, {
                method: 'PUT', // Método PUT para atualizar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });
            const data = await response.json();
            console.log('Atleta atualizado:', data);
            // Faça algo com a resposta, se necessário
        } catch (error) {
            console.error('Erro ao atualizar atleta:', error);
        }
    }
});