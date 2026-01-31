const lista = document.getElementById("listaUsuarios");

async function carregarUsuarios() {
  const resposta = await fetch("http://localhost:3000/usuarios");
  const usuarios = await resposta.json();

  lista.innerHTML = "";

  usuarios.forEach(usuario => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = `${usuario.nome} - ${usuario.email} (${usuario.idade})`;

    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.style.marginLeft = "10px";

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.style.marginLeft = "5px";

    btnEditar.addEventListener("click", () => editarUsuario(usuario));
    btnExcluir.addEventListener("click", () => excluirUsuario(usuario.id));

    li.appendChild(texto);
    li.appendChild(btnEditar);
    li.appendChild(btnExcluir);

    lista.appendChild(li);
  });
}

carregarUsuarios();

async function excluirUsuario(id) {
  const confirmar = confirm("Deseja excluir este usuário?");
  if (!confirmar) return;

  await fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "DELETE"
  });

  carregarUsuarios();
}

const form = document.getElementById("formUsuario");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("usuarioId").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const idade = document.getElementById("idade").value;

  if (id) {
    // UPDATE
    await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, idade })
    });
  } else {
    // CREATE
    await fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nome, email, idade })
    });
  }

  form.reset();
  document.getElementById("usuarioId").value = "";
  carregarUsuarios();
});


function editarUsuario(usuario) {
  document.getElementById("usuarioId").value = usuario.id;
  document.getElementById("nome").value = usuario.nome;
  document.getElementById("email").value = usuario.email;
  document.getElementById("idade").value = usuario.idade;
}
