document.addEventListener('DOMContentLoaded', function() {
    const idAtletaInput = document.getElementById('idAtleta');

    idAtletaInput.addEventListener('change', async function() {
        const idAtleta = idAtletaInput.value.trim();
        const dadosAtuais = await buscarAtleta(idAtleta);

        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            limparCamposFormulario();
        }
    });

    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter ID do atleta a ser atualizado
        const idAtleta = idAtletaInput.value.trim();

        // Obter os dados atuais do atleta
        const dadosAtuais = await buscarAtleta(idAtleta);

        // Obter valores dos campos do formulário
        const name = document.getElementById('nomeAtleta').value.trim();
        const birth_date = document.getElementById('idadeAtleta').value.trim();
        const height = parseFloat(document.getElementById('alturaAtleta').value.trim()); // Corrigido para aceitar float
        const weight = parseFloat(document.getElementById('pesoAtleta').value.trim()); // Corrigido para aceitar float
        const best_times = document.getElementById('bestTimes').value.trim();
        const medal_history = document.getElementById('medalHistory').value.trim();
        const specializations = document.getElementById('specializations').value.trim(); // Obtendo o valor do campo de especializações

        const country = document.getElementById('paisAtleta').value.trim();
        const team = document.getElementById('equipeAtleta').value.trim();
        const modality = document.getElementById('esporteAtleta').value.trim();

        const dadosAtualizados = {
            name: name,
            birth_date: birth_date,
            height: height,
            weight: weight,
            specializations: specializations,
            country: country,
            team: team,
            modality: modality,
            best_times: best_times,
            medal_history: medal_history
        };

        // Chamar a função para atualizar o atleta
        await atualizarAtleta(idAtleta, dadosAtualizados);
    });

    async function buscarAtleta(idAtleta) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${idAtleta}`);
            if (!response.ok) {
                throw new Error('Atleta não encontrado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao buscar atleta: ${error.message}`);
            return null;
        }
    }

    function preencherCamposFormulario(dadosAtuais) {
        document.getElementById('nomeAtleta').value = dadosAtuais.name;
        document.getElementById('idadeAtleta').value = dadosAtuais.birth_date;
        document.getElementById('alturaAtleta').value = dadosAtuais.height;
        document.getElementById('pesoAtleta').value = dadosAtuais.weight;
        document.getElementById('bestTimes').value = dadosAtuais.best_times;
        document.getElementById('medalHistory').value = dadosAtuais.medal_history;
        document.getElementById('specializations').value = dadosAtuais.specializations; // Preencher o campo de especializações

        // Preencher os campos adicionais
        document.getElementById('paisAtleta').value = dadosAtuais.country;
        document.getElementById('equipeAtleta').value = dadosAtuais.team;
        document.getElementById('esporteAtleta').value = dadosAtuais.modality;
    }

    function limparCamposFormulario() {
        document.getElementById('nomeAtleta').value = '';
        document.getElementById('idadeAtleta').value = '';
        document.getElementById('alturaAtleta').value = '';
        document.getElementById('pesoAtleta').value = '';
        document.getElementById('bestTimes').value = '';
        document.getElementById('medalHistory').value = '';
        document.getElementById('specializations').value = ''; // Limpar o campo de especializações
        document.getElementById('paisAtleta').value = '';
        document.getElementById('equipeAtleta').value = '';
        document.getElementById('esporteAtleta').value = '';
    }

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
            alert('Atleta atualizado com sucesso!');
            // Faça algo com a resposta, se necessário
        } catch (error) {
            console.error('Erro ao atualizar atleta:', error);
        }
    }
});
