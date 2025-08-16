import api from "./api.js";
// TO DO:
// Escrever a validação do campo nome dos filmes para ter certeza que o formulário não é frágil
// Escrever a validação do campo nome dos filmes para ter certeza que o formulário não é frágil
// Escrever a validação do campo que remove espaços vazios na lista

const ui = {
  async preencherFormulario(filmeId) {
    const filme = await api.buscarFilmePorId(filmeId);
    document.getElementById("filme-id").value = filme.id;
    document.getElementById("filme-nome").value = filme.nome;
    document.getElementById("filme-genero").value = filme.genero;
    document.getElementById("filme-data").value = filme.data
      .toISOString()
      .split("T")[0];
  },

  limparFormulario() {
    document.getElementById("filme-form").reset();
  },

  async renderizarFilmes(filmesFiltrados) {
    const listaFilmes = document.getElementById("lista-filmes");
    listaFilmes.innerHTML = "";

    try {
      let filmesParaRenderizar;

      if (filmesFiltrados) {
        filmesParaRenderizar = filmesFiltrados;
      } else {
        filmesParaRenderizar = await api.buscarFilmes();
      }

      filmesParaRenderizar.forEach(ui.adicionarFilmeNaLista);
    } catch (error) {
      alert(`Erro ao renderizar filmes. Erro: ${error}`);
    }
  },

  adicionarFilmeNaLista(filme) {
    const listaFilmes = document.getElementById("lista-filmes");
    const li = document.createElement("li");
    li.setAttribute("data-id", filme.id);
    li.classList.add("li-filme");

    const filmeNome = document.createElement("div");
    filmeNome.textContent = filme.nome;
    filmeNome.classList.add("filme-nome");

    const filmeGenero = document.createElement("div");
    filmeGenero.textContent = filme.genero;
    filmeGenero.classList.add("filme-genero");

    const filmeData = document.createElement("div");
    let options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    };

    const dataFormatada = filme.data.toLocaleDateString("pt-BR", options);
    filmeData.textContent = dataFormatada;
    filmeData.classList.add("filme-data");

    const btnFavorito = document.createElement("button");
    btnFavorito.classList.add("botao-favorito");
    btnFavorito.onclick = () => {
      api.atualizarFavorito(id, !favorito);
    };
    const iconeFavorito = document.createElement("img");
    iconeFavorito.src = filme.favorito
      ? "./assets/imagens/icone-favorito.png"
      : "./assets/imagens/icone-favorito_outline.png";
    iconeFavorito.alt = "Favorito";

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("botao-editar");
    botaoEditar.onclick = () => ui.preencherFormulario(filme.id);

    const iconeEditar = document.createElement("img");
    iconeEditar.src = "assets/imagens/icone-editar.png";
    iconeEditar.alt = "Editar";
    botaoEditar.appendChild(iconeEditar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("botao-excluir");
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirFilme(filme.id);
        ui.renderizarFilmes();
      } catch (error) {
        alert(`Erro ao excluir filme, ${error}`);
      }
    };

    btnFavorito.appendChild(iconeFavorito);

    const iconeExcluir = document.createElement("img");
    iconeExcluir.src = "assets/imagens/icone-excluir.png";
    iconeExcluir.alt = "Excluir";
    botaoExcluir.appendChild(iconeExcluir);

    const icones = document.createElement("div");
    icones.classList.add("icones");
    icones.appendChild(btnFavorito);
    icones.appendChild(botaoEditar);
    icones.appendChild(botaoExcluir);

    li.appendChild(filmeNome);
    li.appendChild(filmeGenero);
    li.appendChild(filmeData);
    li.appendChild(icones);
    listaFilmes.appendChild(li);
  },
};

export default ui;
