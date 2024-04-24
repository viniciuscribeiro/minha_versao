document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente

    // Obter os valores de email e senha
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Verificar se o email e a senha correspondem aos credenciais desejados
    if (email === "contadojuiz1359@gmail.com" && senha === "soeuseiasenha") {
        // Redirecionar para a página de destino após o login bem-sucedido
        window.location.href = "home.html";
    } else {
        // Exibir mensagem de erro se as credenciais estiverem incorretas
        var errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = "Credenciais inválidas. Por favor, tente novamente.";
    }
});
