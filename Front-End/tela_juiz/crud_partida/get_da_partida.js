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
                throw new Error('Erro ao buscar as partidas!');
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

            // Adicionando imagens da caneta e da lixeira como links
            const linkEditar = document.createElement('a');
            linkEditar.href = `../tela_juiz/atualizar_partida.html?id=${partida.id}`; // Defina o URL de edição aqui
            linkEditar.classList.add('link-editar');
            const imgCaneta = document.createElement('img');
            imgCaneta.src = 'https://cdn-icons-png.flaticon.com/512/1159/1159725.png'; // URL da imagem da caneta
            imgCaneta.alt = 'Editar';
            linkEditar.appendChild(imgCaneta);
    
            const linkExcluir = document.createElement('a');
            linkExcluir.href = `../tela_juiz/excluir_partida.html?id=${partida.id}`; // Defina o URL de exclusão aqui
            linkExcluir.classList.add('link-excluir');
            const imgLixeira = document.createElement('img');
            imgLixeira.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'; // URL da imagem da lixeira
            imgLixeira.alt = 'Excluir';
            linkExcluir.appendChild(imgLixeira);
    
            // Adicionando os links de edição e exclusão ao bloco da partida
            const iconsDiv = document.createElement('div');
            iconsDiv.classList.add('icons-container');
            iconsDiv.appendChild(linkEditar);
            iconsDiv.appendChild(linkExcluir);

            partidaDiv.appendChild(dataPartida);
            partidaDiv.appendChild(localPartida);
            partidaDiv.appendChild(tipoPartida);
            partidaDiv.appendChild(distanciaPartida);
            partidaDiv.appendChild(atletasPartida);
            partidaDiv.appendChild(statusPartida);
            partidaDiv.appendChild(juizesPartida);
            partidaDiv.appendChild(resultadoPartida);
            partidaDiv.appendChild(iconsDiv);
            
            listaPartidas.appendChild(partidaDiv);
        });
        resultadoBusca.appendChild(listaPartidas);
    }
});
