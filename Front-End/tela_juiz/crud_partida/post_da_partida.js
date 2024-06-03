document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('partidaForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtém os valores do formulário
    const dataHoraPartida = document.getElementById('dataHoraPartida').value;
    const match_type = document.getElementById('match_type').value;
    const distanciaProva = parseInt(document.getElementById('distanciaProva').value);
    const localPartida = document.getElementById('localPartida').value;
    const match_status = 'Partida agendada';
    const judges = document.getElementById('judges').value;
    const result = '';

    // Coleta os nomes dos atletas em uma matriz
    let atletasArray = [];
    for (let i = 1; i <= 8; i++) {
      const atletaNome = document.getElementById('atleta' + i + 'Nome').value;
      if (atletaNome.trim() !== '') {
        atletasArray.push(atletaNome);
      }
    }

    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }
    const token = getCookie('access_token');

    if (!token) {
      alert('Token não encontrado. Por favor, faça login novamente.');
      return;
    }

    // Função para verificar se o atleta existe na API
    function checkAthleteExists(nome, token) {
      return fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/athletes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        // Verifica se o nome do atleta está na lista de atletas retornada pela API
        return data.some(athlete => athlete.name === nome);
      });
    }

    // Verifica se todos os atletas existem
    Promise.all(atletasArray.map(nome => checkAthleteExists(nome, token)))
      .then(results => {
        if (results.every(exists => exists)) {
          // Monta o objeto com os dados da partida
          const partidaData = {
            datetime: dataHoraPartida,
            match_type: match_type,
            distance: distanciaProva,
            match_status: match_status,
            judges: judges,
            location: localPartida,
            athletes_involved: atletasArray.join(', '),
            result: result
          };

          // Envia os dados para a API
          fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/match', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(partidaData)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao criar a partida. Por favor, tente novamente.');
            }
            return response.json();
          })
          .then(data => {
            console.log('Partida criada com sucesso:', data);
            alert('Partida criada com Sucesso!');
          })
          .catch(error => {
            console.error('Erro:', error.message);
            if (error.response) {
              error.response.text().then(errorMessage => {
                console.error('Corpo da resposta do servidor:', errorMessage);
              });
            }
          });
        } else {
          alert('Um ou mais atletas inseridos não existem. Por favor, verifique os nomes.');
        }
      })
      .catch(error => {
        console.error('Erro ao verificar atletas:', error.message);
      });
  });
});
