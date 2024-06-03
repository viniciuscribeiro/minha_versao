document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obter valores dos campos do formulário
        const name = document.getElementById('nomeAtleta').value;
        const birth_date = document.getElementById('idadeAtleta').value;
        const height = parseFloat(document.getElementById('alturaAtleta').value);
        const weight = parseFloat(document.getElementById('pesoAtleta').value);
        const best_times = document.getElementById('bestTimes').value;
        const medal_history = document.getElementById('medalHistory').value;
        const country = document.getElementById('paisAtleta').value;
        const team = document.getElementById('equipeAtleta').value;
        const modality = document.getElementById('esporteAtleta').value;

        // Coletar especializações selecionadas
        const specializationsElements = document.querySelectorAll('#especializacoes input[type="checkbox"]:checked');
        const specializations = Array.from(specializationsElements).map(el => el.value).join(', ');

        // Criar objeto novoAtleta
        const novoAtleta = {
            name: name,
            birth_date: birth_date,
            height: height,
            weight: weight,
            specializations: specializations, // Modificado para usar o valor concatenado das especializações
            country: country,
            team: team,
            modality: modality,
            best_times: best_times,
            medal_history: medal_history
        };

        console.log('Atleta criado:', novoAtleta);
        // Chamar a função para criar o novo atleta
        await criarAtleta(novoAtleta);
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }
    async function criarAtleta(novoAtleta) {
        const token = getCookie('access_token');
        try {
            const response = await fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete', {
                method: 'POST',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(novoAtleta)
            });
            const data = await response.json();
            console.log('Novo atleta criado:', data);
            alert('Atleta Criado com sucesso!');

        } catch (error) {
            console.error('Erro ao criar atleta:', error);
        }
    }
});
