url = `http://localhost:3000/livros`

window.onload = function() {
    const salvos = JSON.parse(localStorage.getItem("meusLivros")) || [];
    const lista = document.getElementById("lista_livros");
    
    salvos.forEach(livro => {
        let li = document.createElement('li');
        li.innerHTML = `Titulo: ${livro.titulo} Autor: ${livro.autor} Status: ${livro.status_leitura} Nota: ${livro.nota}<br>`;
        
       
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "X";
        btnDelete.onclick = function() {
            fetch(`${url}/${livro.id}`, { method: "DELETE" }).then(() => {
                let salvosAtuais = JSON.parse(localStorage.getItem("meusLivros")) || [];
                localStorage.setItem("meusLivros", JSON.stringify(salvosAtuais.filter(l => l.id !== livro.id)));
                li.remove();
            });
        };
        li.appendChild(btnDelete);
        lista.appendChild(li);
    });
};

function EnviarLivro() {
    
    const pegarMarcados = (idContainer) => {
        const container = document.getElementById(idContainer);
        const selecionados = container.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(selecionados).map(input => input.value);
    };
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const status_leitura = pegarMarcados("status_leitura");
    const nota = document.getElementById("nota").value;

    if(titulo === "" || autor === "" || status_leitura.length !== 1 || nota === "" || nota < 0 || nota > 10) {
        alert("Verifique os campos!");
    } else {
        fetch(url, { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({titulo, autor, status_leitura: status_leitura[0], nota})
        }).then(() => alert("Enviado!"));
    }
}

function mostrarLivro(){
    const lista = document.getElementById("lista_livros")
    let idBusca = document.getElementById("mostrar_livro").value

    fetch(url)
    .then(response => response.json())
    .then(livros => {
        const livro = livros[idBusca];
        if(!livro) return;

        let li = document.createElement('li');
        li.innerHTML = `Titulo: ${livro.titulo} Autor: ${livro.autor} Status: ${livro.status_leitura} Nota: ${livro.nota}<br>`;
        
        
        let btnDelete = document.createElement("button");
        btnDelete.innerHTML = "X";
        
        btnDelete.onclick = function() {
            fetch(`${url}/${livro.id}`, { method: "DELETE" })
            .then(() => {
                let salvos = JSON.parse(localStorage.getItem("meusLivros")) || [];
                let novaLista = salvos.filter(l => l.id !== livro.id);
                localStorage.setItem("meusLivros", JSON.stringify(novaLista));
                li.remove();
            });
        };

        li.appendChild(btnDelete);
        lista.appendChild(li);

        let salvos = JSON.parse(localStorage.getItem("meusLivros")) || [];
        salvos.push(livro);
        localStorage.setItem("meusLivros", JSON.stringify(salvos));
    })
    .catch(error => console.log("erro no carregamento"));
}
function atualizarLivro() {
    
    const pegarMarcados = (idContainer) => {
        const container = document.getElementById(idContainer);
        const selecionados = container.querySelectorAll('input[type="checkbox"]:checked');
        return Array.from(selecionados).map(input => input.value);
    };
    let idParaEditar = document.getElementById("identificador").value
    const titulo = document.getElementById("titulo2").value;
    const autor = document.getElementById("autor2").value;
    const status_leitura = pegarMarcados("status_leitura2");
    const nota = document.getElementById("nota2").value;
    fetch(`${url}/${idParaEditar}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, status_leitura, nota })
    })
    .then(res => {
        if (res.ok) {
            alert("Informações atualizadas!");
        }
    })
    .catch(err => console.log("Erro ao atualizar:", err));
}

