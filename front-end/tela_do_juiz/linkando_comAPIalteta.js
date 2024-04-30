document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter valores dos campos do formulário
        const nome = document.getElementById('nomeAtleta').value;
        const idade = parseInt(document.getElementById('idadeAtleta').value);
        const altura = parseInt(document.getElementById('alturaAtleta').value);
        const peso = parseInt(document.getElementById('pesoAtleta').value);
        const especializacoes = Array.from(document.querySelectorAll('input[name="especializacaoAtleta"]:checked')).map(el => el.value);
        const pais = document.getElementById('paisAtleta').value;
        const equipe = document.getElementById('equipeAtleta').value;
        const esporte = document.getElementById('esporteAtleta').value;

        // Criar objeto novoAtleta
        const novoAtleta = {
            nome: nome,
            idade: idade,
            altura: altura,
            peso: peso,
            especializacoes: especializacoes,
            pais: pais,
            equipe: equipe,
            esporte: esporte
        };

        // Chamar a função para criar o novo atleta
        await criarAtleta(novoAtleta);
    });


    async function criarAtleta(novoAtleta) {
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoAtleta)
            });
            const data = await response.json();
            console.log('Novo atleta criado:', data);
            // Faça algo com a resposta, se necessário
        } catch (error) {
            console.error('Erro ao criar atleta:', error);
        }
    }


    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter ID do atleta a ser atualizado
        const idAtleta = document.getElementById('idAtleta').value;

        // Obter os dados atuais do atleta
        const dadosAtuais = await buscarAtleta(idAtleta);

        // Obter valores dos campos do formulário
        const nome = document.getElementById('nomeAtleta').value;
        const idade = parseInt(document.getElementById('idadeAtleta').value);
        const altura = parseInt(document.getElementById('alturaAtleta').value);
        const peso = parseInt(document.getElementById('pesoAtleta').value);
        const especializacoes = Array.from(document.querySelectorAll('input[name="especializacaoAtleta"]:checked')).map(el => el.value);
        const pais = document.getElementById('paisAtleta').value;
        const equipe = document.getElementById('equipeAtleta').value;
        const esporte = document.getElementById('esporteAtleta').value;

        // Criar objeto com os dados atualizados
        const dadosAtualizados = {
            nome: nome !== '' ? nome : dadosAtuais.nome,
            idade: idade !== '' ? idade : dadosAtuais.idade,
            altura: altura !== '' ? altura : dadosAtuais.altura,
            peso: peso !== '' ? peso : dadosAtuais.peso,
            especializacoes: especializacoes.length > 0 ? especializacoes : dadosAtuais.especializacoes,
            pais: pais !== '' ? pais : dadosAtuais.pais,
            equipe: equipe !== '' ? equipe : dadosAtuais.equipe,
            esporte: esporte !== '' ? esporte : dadosAtuais.esporte
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

    document.getElementById('excluirAtletaForm').addEventListener('submit', async function(event) {
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
                // Faça algo após a exclusão, se necessário
            } else {
                console.error('Erro ao excluir atleta:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir atleta:', error);
        }
    }


    // Chamada para buscar e exibir os dados dos atletas quando a página for carregada
    window.addEventListener('DOMContentLoaded', async function() {
        await buscarAtletasDaAPI();
    });

    // Função para buscar dados de atletas da API
    async function buscarAtletasDaAPI() {
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${id}`);
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