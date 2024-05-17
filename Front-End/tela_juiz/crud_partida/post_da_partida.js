document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('partidaForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os valores do formulário
        const dataHoraPartida = document.getElementById('dataHoraPartida').value;
        const match_type = document.getElementById('match_type').value;
        const distanciaProva = parseInt(document.getElementById('distanciaProva').value);
        const localPartida = document.getElementById('localPartida').value;
        const match_status = document.getElementById('match_status').value;
        const judges = document.getElementById('judges').value;
        const result = document.getElementById('result').value;

        // Obtém os nomes dos atletas e os junta em uma única string
        let atletas = '';
        for (let i = 1; i <= 8; i++) {
            const atletaNome = document.getElementById('atleta' + i + 'Nome').value;
            if (atletaNome.trim() !== '') {
                atletas += atletaNome + ', ';
            }
        }
        // Remove a vírgula extra no final
        atletas = atletas.slice(0, -2);

        // Monta o objeto com os dados da partida
        const partidaData = {
            datetime: dataHoraPartida,
            match_type: match_type,
            distance: distanciaProva,
            match_status: match_status,
            judges: judges,
            location: localPartida,
            athletes_involved: atletas, // Agora é uma única string
            result: result
        };

        // Envia os dados para a API
        fetch('http://ec2-44-201-200-110.compute-1.amazonaws.com/match', {
            method: 'POST',
            headers: {
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
            // Tratar a resposta da API aqui se necessário
            console.log('Partida criada com sucesso:', data);
            // Redirecionar ou mostrar uma mensagem de sucesso, etc.
            alert('Partida realizada com Sucesso!');
        })
        .catch(error => {
            console.error('Erro:', error.message);
            // Se houver uma resposta do servidor, imprime o corpo da resposta
            if (error.response) {
                error.response.text().then(errorMessage => {
                    console.error('Corpo da resposta do servidor:', errorMessage);
                });
            }
        });
    });
});
