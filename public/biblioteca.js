url = `http://localhost:3000/livros`




let id = 1

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
    fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((livros) => {
    const li = document.getElementById("li")

    let titulo2 = livros[1].titulo
    let autor2 = livros[1].autor
    let status_leitura2 = livros[1].status_leitura
    let nota2 = livros[1].nota

    let titulo3 = document.createTextNode(titulo2.value);
    let autor3 = document.createTextNode(autor2.value);
    let status_leitura3 = document.createTextNode(status_leitura2.value);
    let nota3 = document.createTextNode(nota2.value);

    li.appendChild(titulo3)
    li.appendChild(autor3)
    li.appendChild(status_leitura3)
    li.appendChild(nota3)

     const pegarMarcados = (idContainer) => {
        const container = document.getElementById(idContainer);
        if (!container) return []; // Retorna lista vazia se não achar o ID
        
        const selecionados = container.querySelectorAll('p');
        return Array.from(selecionados).map(input => input.value);
     };
})
    }
}
 