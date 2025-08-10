const url = "http://localhost:3030";

const converterStringParaData = (dataString) => {
  const [ano, mes, dia] = dataString.split("-"); // Irá pegar a data de 2025-07-28 e converter em [2025, 07, 08]
  return new Date(Date.UTC(ano, mes - 1, dia));
};

const api = {
  async buscarFilmes() {
    try {
      const response = await axios.get(`${url}/filmes`);
      const resposta = await response.data;
      return resposta.map((filme) => {
        return {
          ...filme,
          data: new Date(filme.data),
        };
      });
    } catch (error) {
      alert(`Erro ao buscar filmes ${error}`);
      throw error;
    }
  },

  async salvarFilme(filme) {
    try {
      const data = converterStringParaData(filme.data);
      const response = await axios.post(`${url}/filmes`, filme);
      return await response.data;
    } catch {
      alert("Erro ao salvar filme");
      throw error;
    }
  },

  async buscarFilmePorId(id) {
    try {
      const response = await axios.get(`${url}/filmes/${id}`);
      const resposta = await response.data;
      return {
        ...resposta,
        data: new Date(resposta.data),
      };
    } catch {
      alert("Erro ao buscar filme");
      throw error;
    }
  },

  async editarFilme(filme) {
    try {
      const response = await axios.put(`${url}/filmes/${filme.id}`, filme);
      return await response.data;
    } catch {
      alert("Erro ao editar filme");
      throw error;
    }
  },

  async excluirFilme(id) {
    try {
      const response = await axios.delete(`${url}/filmes/${id}`);
    } catch {
      alert("Erro ao excluir um filme");
      throw error;
    }
  },
  async buscarFilmePorTermo(termo) {
    try {
      const filmes = await this.buscarFilmes();
      let termoEmMinusculas = termo.toLowerCase();

      const filmesFiltrados = filmes.filter((filme) => {
        return (
          filme.nome.toLowerCase().includes(termoEmMinusculas) ||
          filme.genero.toLowerCase().includes(termoEmMinusculas)
        );
      });
      return filmesFiltrados;
    } catch (error) {
      alert("Erro ao procurar filme");
      throw error;
    }
  },
  async atualizarFavorito(id, favorito) {
    try {
      const response = await axios.patch(`${url}/filmes/${id}`, `${favorito}`);
      response.data;
    } catch (error) {
      alert("Erro ao atualizar favorito");
      throw error;
    }
  },
};

export default api;
