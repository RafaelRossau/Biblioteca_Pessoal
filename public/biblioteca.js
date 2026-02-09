function EnviarLivro(){
     const pegarMarcados = (idContainer) => {
        const container = document.getElementById(idContainer);
        if (!container) return []; // Retorna lista vazia se não achar o ID
        
        const selecionados = container.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(selecionados).map(input => input.value);
     };
    const titulo = document.getElementById("titulo").value
    const autor = document.getElementById("autor").value
    const status_leitura = pegarMarcados("status_leitura")
    const nota = document.getElementById("nota").value

    if(titulo === ""){
        alert("O titulo não pode ficar vázio!")
    }
    else if(titulo.length > 100){
        alert("Limite de titulo excedido.")
    }
    else if(autor === ""){
        alert("O nome do autor não pode ficar vázio!")
    }
    else if(autor.length > 100){
        alert("Limite do nome do autor excedido.")
    }
    else if(status_leitura.length > 1){
        alert("Escolha apenas uma opção de status de leitura!")
    }
    else if(status_leitura.length == 0){
        alert("Selecione um status de leitura!")
    }
    else if(nota < 0 || nota > 10 || nota === ""){
    alert("Escreva uma nota de 0 a 10.")
    }
    else{
        alert("Enviado com sucesso!")
        fetch("/livros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({titulo, autor, status_leitura, nota})
    })
    }
}