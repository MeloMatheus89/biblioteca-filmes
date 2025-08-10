import ui from "./ui.js";
import api from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarFilmes();

  const formularioFilme = document.getElementById("filme-form");
  const botaoCancelar = document.getElementById("botao-cancelar");

  formularioFilme.addEventListener("submit", manipularSubmissaoFormulario);
  botaoCancelar.addEventListener("click", manipularCancelamento);

  const campoBusca = document.getElementById("campo-busca");
  campoBusca.addEventListener("input", manipularBusca);
});

async function manipularSubmissaoFormulario(event) {
  event.preventDefault();
  const id = document.getElementById("filme-id").value;
  const nome = document.getElementById("filme-nome").value;
  const genero = document.getElementById("filme-genero").value;

  try {
    if (id) {
      await api.editarFilme({ id, nome, genero });
    } else {
      await api.salvarFilme({ nome, genero });
    }
    ui.renderizarFilmes();
  } catch {
    alert("Erro ao salvar filme");
  }
}

function manipularCancelamento() {
  ui.limparFormulario();
}

async function manipularBusca(termo) {
  const termoBuscado = document.getElementById("campo-busca").value;
  try {
    const filmesFiltrados = await api.buscarFilmePorTermo(termoBuscado);
    ui.renderizarFilmes(filmesFiltrados);
  } catch {
    alert("Erro ao procurar por filme");
  }
}
