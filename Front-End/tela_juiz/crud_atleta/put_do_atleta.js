document.addEventListener('DOMContentLoaded', async function() {
    const idAtletaInput = document.getElementById('idAtleta');
    const urlParams = new URLSearchParams(window.location.search);
    const idAtletaFromURL = urlParams.get('id');

    if (idAtletaFromURL) {
        idAtletaInput.value = idAtletaFromURL;
        await preencherCamposComDadosDoAtleta(idAtletaFromURL);
    }

    async function preencherCamposComDadosDoAtleta(idAtleta) {
        const dadosAtuais = await buscarAtleta(idAtleta);
        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados do atleta');
        }
    }

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
        document.getElementById('paisAtleta').value = dadosAtuais.country;
        document.getElementById('equipeAtleta').value = dadosAtuais.team;
        document.getElementById('esporteAtleta').value = dadosAtuais.modality;

        const specializations = dadosAtuais.specializations.split(', ');
        document.querySelectorAll('input[name="specializations"]').forEach(checkbox => {
            checkbox.checked = specializations.includes(checkbox.value);
        });
    }

    idAtletaInput.addEventListener('change', async function() {
        const idAtleta = idAtletaInput.value.trim();
        const dadosAtuais = await buscarAtleta(idAtleta);
        if (dadosAtuais) {
            preencherCamposFormulario(dadosAtuais);
        } else {
            console.error('Erro ao obter dados do atleta');
        }
    });

    document.getElementById('atletaForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const idAtleta = idAtletaInput.value.trim();
        const name = document.getElementById('nomeAtleta').value.trim();
        const birth_date = document.getElementById('idadeAtleta').value.trim();
        const height = parseFloat(document.getElementById('alturaAtleta').value.trim());
        const weight = parseFloat(document.getElementById('pesoAtleta').value.trim());
        const best_times = document.getElementById('bestTimes').value.trim();
        const medal_history = document.getElementById('medalHistory').value.trim();
        const specializations = Array.from(document.querySelectorAll('input[name="specializations"]:checked')).map(cb => cb.value).join(', ');
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

        await atualizarAtleta(idAtleta, dadosAtualizados);
    });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      }
    async function atualizarAtleta(idAtleta, dadosAtualizados) {
        const token = getCookie('access_token');
        try {
            const response = await fetch(`http://ec2-44-201-200-110.compute-1.amazonaws.com/athlete/${idAtleta}`, {
                method: 'PUT',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(dadosAtualizados)
            });
            const data = await response.json();
            console.log('Atleta atualizado:', data);
            alert('Atleta atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar atleta:', error);
        }
    }
});
