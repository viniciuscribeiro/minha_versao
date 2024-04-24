let proximoId = 1;

function criarAtleta() {
    const nome = document.getElementById('nomeAtleta').value;
    const idade = document.getElementById('idadeAtleta').value;
    const altura = document.getElementById('alturaAtleta').value;
    const peso = document.getElementById('pesoAtleta').value;
    const especializacao = document.getElementById('especializacaoAtleta').value;
    const pais = document.getElementById('paisAtleta').value;
    const equipe = document.getElementById('equipeAtleta').value;
    const esporte = document.getElementById('esporteAtleta').value;

    // Cria um objeto com os dados do atleta
    const atleta = {
        id: proximoId,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        especializacao: especializacao,
        pais: pais,
        equipe: equipe,
        esporte: esporte
    };

    // Incrementa o ID para o próximo atleta
    proximoId++;

    // Atualiza o campo de ID do atleta com o ID do atleta criado
    document.getElementById('idAtleta').value = atleta.id;

    console.log('Atleta criado:', atleta);
}
