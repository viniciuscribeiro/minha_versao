let proximoId = 1;

function criarAtleta() {
    const nome = document.getElementById('nomeAtleta').value;
    const idade = document.getElementById('idadeAtleta').value;
    const pais = document.getElementById('paisAtleta').value;
    const esporte = document.getElementById('esporteAtleta').value;

    // Cria um objeto com os dados do atleta
    const atleta = {
        id: proximoId,
        nome: nome,
        idade: idade,
        pais: pais,
        esporte: esporte
    };

    // Incrementa o ID para o próximo atleta
    proximoId++;

    // Atualiza o campo de ID do atleta com o ID do atleta criado
    document.getElementById('idAtleta').value = atleta.id;

    // Aqui você pode fazer o que quiser com o objeto 'atleta'
    console.log('Atleta criado:', atleta);
}
