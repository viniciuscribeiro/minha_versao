document.addEventListener('DOMContentLoaded', async function() {
    // Obter o campo de ID da partida
    const idPartidaInput = document.getElementById('idPartida');

    // Obter o ID da partida da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idPartidaFromURL = urlParams.get('id');

    // Preencher o campo "ID" com o valor da URL, se disponível
    if (idPartidaFromURL) {
        idPartidaInput.value = idPartidaFromURL;
        // Chamada para preencher os campos do formulário imediatamente
        await preencherCamposComDadosDaPartida(idPartidaFromURL);
    }

    // Função para buscar os dados da partida e preencher os campos do formulário
    async function preencherCamposComDadosDaPartida(idPartida) {
        const dadosAtuais = await buscarAtleta(idPartida);

        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados da partida');
        }
    }

    // Função para buscar os dados da partida
    async function buscarPartida(idPartida) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/match/${idPartida}`);
            if (!response.ok) {
                throw new Error('Partida não encontrada');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Erro ao buscar partida: ${error.message}`);
            return null;
        }
    }

    // Função para preencher os campos do formulário com os dados da partida
    function preencherCamposFormulario(dadosAtuais) {
        document.getElementById('dataHoraPartida').value = dadosAtuais.datetime;
        document.getElementById('match_type').value = dadosAtuais.match_type;
        document.getElementById('distanciaProva').value = dadosAtuais.distance;
        document.getElementById('localPartida').value = dadosAtuais.location;
        document.getElementById('match_status').value = dadosAtuais.match_status;
        document.getElementById('judges').value = dadosAtuais.judges;
        document.getElementById('result').value = dadosAtuais.result;
        document.getElementById('atletasEnvolvidos').value = dadosAtuais.athletes_involved;
    }

    // Event listener para quando o campo de ID da partida mudar
    idPartidaInput.addEventListener('change', async function() {
        const idPartida = idPartidaInput.value.trim();
        const dadosAtuais = await buscarPartida(idPartida);

        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados da partida');
        }
    });

    // Event listener para o envio do formulário
    document.getElementById('partidaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter ID da partida a ser atualizada
        const idPartida = idPartidaInput.value.trim();

        // Obter os dados atuais da partida
        const dadosAtuais = await buscarPartida(idPartida);

        // Obter valores dos campos do formulário
        const datetime = document.getElementById('dataHoraPartida').value.trim();
        const match_type = document.getElementById('match_type').value.trim();
        const distance = parseFloat(document.getElementById('distanciaProva').value.trim());
        const match_status = document.getElementById('match_status').value.trim();
        const judges = document.getElementById('judges').value.trim();
        const location = document.getElementById('localPartida').value.trim();
        const athletes_involved = document.getElementById('atletasEnvolvidos').value.trim();
        const result = document.getElementById('result').value.trim();
        
        // Montar objeto com os dados atualizados da Partida
        const dadosAtualizados = {
            datetime: datetime,
            match_type: match_type,
            distance: distance,
            match_status: match_status,
            judges: judges,
            location: location,
            athletes_involved: athletes_involved,
            result: result,
        };

        // Chamar a função para atualizar a Partida
        await atualizarPartida(idPartida, dadosAtualizados);
    });

    // Função para atualizar os dados da partida
    async function atualizarPartida(idPartida, dadosAtualizados) {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/match/${idPartida}`, {
                method: 'PUT', // Método PUT para atualizar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosAtualizados)
            });
            const data = await response.json();
            console.log('Partida atualizada:', data);
            alert('Partida atualizada com sucesso!');
            // Faça algo com a resposta, se necessário
        } catch (error) {
            console.error('Erro ao atualizar partida:', error);
        }
    }
});
