document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buscarPartidaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        const dataPartida = document.getElementById('dataPartida').value;
        if (dataPartida.trim() !== '') {
            // Se o campo de data não estiver vazio, busca as partidas pela data
            await buscarPartidasPorData(dataPartida);
        }
    });

    document.getElementById('buscarTodasPartidasForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        console.log('Buscando todas as partidas...');
        await buscarTodasPartidas();
    });

    async function buscarPartidasPorData(dataSelecionada) {
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/matches');
            if (!response.ok) {
                throw new Error('Erro ao buscar as partidas');
            }
            const partidas = await response.json();
            console.log('Todas as partidas:', partidas);
            
            // Filtrar as partidas pela data selecionada
            const partidasDaData = partidas.filter(partida => {
                const dataPartida = new Date(partida.datetime).toLocaleDateString();
                const dataSelecionadaFormatada = new Date(dataSelecionada).toLocaleDateString();
                return dataPartida === dataSelecionadaFormatada;
            });
    
            console.log('Partidas na data selecionada:', partidasDaData);
            exibirResultados(partidasDaData);
        } catch (error) {
            console.error(error.message);
        }
    }
    

    async function buscarTodasPartidas() {
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/matches');
            if (!response.ok) {
                throw new Error('Erro ao buscar todas as partidas');
            }
            const partidas = await response.json();
            console.log('Todas as partidas:', partidas);
            exibirResultados(partidas);
        } catch (error) {
            console.error(error.message);
        }
    }

    function exibirResultados(partidas) {
        const resultadoBusca = document.getElementById('resultadoBusca');
        resultadoBusca.innerHTML = ''; // Limpa os resultados anteriores

        if (partidas.length === 0) {
            resultadoBusca.textContent = 'Nenhuma partida encontrada.';
            return;
        }

        const listaPartidas = document.createElement('div');
        listaPartidas.classList.add('lista-partidas'); // Adicionando uma classe para estilização opcional
        partidas.forEach(partida => {
            const partidaDiv = document.createElement('div');
            partidaDiv.classList.add('partida');

            const dataPartida = document.createElement('h3');
            dataPartida.textContent = `Data e Hora: ${partida.datetime}`;

            const localPartida = document.createElement('p');
            localPartida.textContent = `Local: ${partida.location}`;

            const tipoPartida = document.createElement('p');
            tipoPartida.textContent = `Tipo de Partida: ${partida.match_type}`;

            const distanciaPartida = document.createElement('p');
            distanciaPartida.textContent = `Distância: ${partida.distance}m`;

            const atletasPartida = document.createElement('p');
            atletasPartida.textContent = `Atletas: ${partida.athletes_involved}`;

            const statusPartida = document.createElement('p');
            statusPartida.textContent = `Status: ${partida.match_status}`;

            const juizesPartida = document.createElement('p');
            juizesPartida.textContent = `Juízes: ${partida.judges}`;

            const resultadoPartida = document.createElement('p');
            resultadoPartida.textContent = `Resultado: ${partida.result}`;

            partidaDiv.appendChild(dataPartida);
            partidaDiv.appendChild(localPartida);
            partidaDiv.appendChild(tipoPartida);
            partidaDiv.appendChild(distanciaPartida);
            partidaDiv.appendChild(atletasPartida);
            partidaDiv.appendChild(statusPartida);
            partidaDiv.appendChild(juizesPartida);
            partidaDiv.appendChild(resultadoPartida);

            listaPartidas.appendChild(partidaDiv);
        });
        resultadoBusca.appendChild(listaPartidas);
    }
});
