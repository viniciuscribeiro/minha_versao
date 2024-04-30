document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter valores dos campos do formulário
        const nome = document.getElementById('nomeAtleta').value;
        const idade = parseInt(document.getElementById('idadeAtleta').value);
        const altura = parseInt(document.getElementById('alturaAtleta').value);
        const peso = parseInt(document.getElementById('pesoAtleta').value);
        const especializacao = document.querySelector('input[name="especializacaoAtleta"]:checked').value; 
        const pais = document.getElementById('paisAtleta').value;
        const equipe = document.getElementById('equipeAtleta').value;
        const esporte = document.getElementById('esporteAtleta').value;

        // Criar objeto novoAtleta
        const novoAtleta = {
            nome: nome,
            idade: idade,
            altura: altura,
            peso: peso,
            especializacao: especializacao  ,
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
});