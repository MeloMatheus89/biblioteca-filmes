Vamos finalizar nossa lista de filmes com essa lista de exercícios?

1. Evitando filmes repetidos

A última funcionalidade que vamos implementar no projeto é a de verificar se o filme já faz parte da lista e evitar que seja adicionado novamente. Para fazer isso, você pode usar o Set que foi apresentado ao longo das aulas. Crie uma variável e atribua a ela um novo Set.

Vamos lá? 2. Criando uma chave única para cada filme

Agora, escreva uma função que adiciona uma chave a cada um dos filmes que já fazem parte da lista. Busque os filmes na API e, para cada um deles, crie uma chave única baseada no nome dos filmes. Por fim, adicione essa chave à lista de filmes. Caso obtenha erros, emita um alerta.

Dicas:

    Lembre-se de usar try e catch para capturar erros;
    Também é importante adicionar a função dentro do evento de DOMContentLoaded.

Bons estudos! 3. Comparando os filmes da lista com o novo filme adicionado

Vamos comparar a chave dos filmes que fazem parte da lista com a chave dos filmes que está sendo adicionado para verificar se o filme já existe na lista e impedir que ele seja adicionado novamente.

Para fazer essas coisas, crie uma constante que vai gerar uma chave para o filme que será adicionado e usar uma condicional para comparar as chaves. Caso o filme já exista na lista, exiba um alerta na tela da pessoa usuária.

Dicas:

    Você pode usar o método has do Set para realizar essa verificação.

Vamos para a última?
