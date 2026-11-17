const API_URL = "http://localhost:8000";

const form = document.getElementById("produtoForm");
const input = document.getElementById("nomeProduto");
const lista = document.getElementById("listaProdutos");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, erro = false) {
  mensagem.textContent = texto;
  mensagem.style.color = erro ? "#dc2626" : "#047857";
}

async function carregarProdutos() {
  try {
    const resposta = await fetch(`${API_URL}/produtos`);
    const produtos = await resposta.json();

    lista.innerHTML = "";

    if (produtos.length === 0) {
      lista.innerHTML = '<li class="empty">Nenhum produto cadastrado.</li>';
      return;
    }

    produtos.forEach((produto) => {
      const item = document.createElement("li");
      item.className = "product-item";

      const nome = document.createElement("span");
      nome.textContent = produto.nome;

      const botaoExcluir = document.createElement("button");
      botaoExcluir.className = "delete-button";
      botaoExcluir.textContent = "Excluir";
      botaoExcluir.onclick = () => excluirProduto(produto.id);

      item.appendChild(nome);
      item.appendChild(botaoExcluir);
      lista.appendChild(item);
    });
  } catch (error) {
    mostrarMensagem("Erro ao carregar produtos. Verifique se o backend está ativo.", true);
  }
}

async function salvarProduto(event) {
  event.preventDefault();

  const nome = input.value.trim();
  if (!nome) {
    mostrarMensagem("Informe o nome do produto.", true);
    return;
  }

  try {
    const resposta = await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome }),
    });

    if (!resposta.ok) {
      throw new Error("Erro ao salvar produto.");
    }

    input.value = "";
    mostrarMensagem("Produto salvo com sucesso.");
    carregarProdutos();
  } catch (error) {
    mostrarMensagem("Erro ao salvar produto.", true);
  }
}

async function excluirProduto(id) {
  try {
    const resposta = await fetch(`${API_URL}/produtos/${id}`, {
      method: "DELETE",
    });

    if (!resposta.ok) {
      throw new Error("Erro ao excluir produto.");
    }

    mostrarMensagem("Produto excluído com sucesso.");
    carregarProdutos();
  } catch (error) {
    mostrarMensagem("Erro ao excluir produto.", true);
  }
}

form.addEventListener("submit", salvarProduto);
carregarProdutos();
