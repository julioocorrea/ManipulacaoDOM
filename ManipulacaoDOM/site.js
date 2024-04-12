// PRÁTICA
// Alterem o conteúdo sobre a empresa.
// 1. Buscar pelo id correto OK
// 2. Printar na tela a tag e analisar o conteúdo OK
// 3. Printar o conteúdo no console
// 4. Alterar o conteúdo sobre a empresa 
// (insiram o nome da empresa no text, usando template string)

const menus = document.getElementsByClassName("menu")
// HTML COLLECTION
console.log(menus)

// Converter uma collection para Array
const menusArray = Array.from(menus)

console.log(menusArray)

menusArray.forEach(menu => {
    console.log(menu.innerText)
})

const menuNomes = menusArray.map(menu => menu.innerText)

console.log(`Os menus do site são: ${menuNomes.join(", ")}`)


const produtosContainer = document.getElementById("produtos")

console.log(produtosContainer)

const produtos = produtosContainer.children

console.log(produtos)

const produtosArray = Array.from(produtos)

const produtosNomes = produtosArray.map(prod => prod.innerText)

console.log(`Produtos ofertados: ${produtosNomes.join(", ")}`)

/*
{
    "protudo A": 50,
    "produto B": 100,
    "produto C": 80
}
*/

function obterElemento(id) {
return document.getElementById(id);
}

function obterConteudo(elemento) {
return elemento.children[1];
}

function obterArrayDeFilhos(elemento) {
return Array.from(elemento.children);
}

function extrairDadosDaVenda(venda) {
const produtovendido = venda.children[1].innerText;
const quantidadevendida = venda.children[2].innerText;
const valorVendido = venda.children[3].innerText;
const valorVendidoFloat = parseFloat(valorVendido.replace("R$ ", ""));
return { produtovendido, quantidadevendida, valorVendidoFloat };
}

function processarVendas(listaDeVendasArray) {
const produtosVendidos = {};

listaDeVendasArray.forEach(venda => {
    const { produtovendido, quantidadevendida, valorVendidoFloat } = extrairDadosDaVenda(venda);

    if (!produtosVendidos[produtovendido]) {
        produtosVendidos[produtovendido] = { 
            quantidade: 0, valor: 0 
        };
    }

    produtosVendidos[produtovendido].quantidade += parseInt(quantidadevendida);
    produtosVendidos[produtovendido].valor += valorVendidoFloat;
});

return produtosVendidos;
}

function obterNomesDosProdutos(produtosVendidos) {
return Object.keys(produtosVendidos);
}

function criarElementoComConteudo(elemento, conteudo) {
const el = document.createElement(elemento);
el.innerText = conteudo;
return el;
}

function gerarResumoDeVendas(produtosVendidos, resumoVendasElemento) {
const nomesDosProdutos = obterNomesDosProdutos(produtosVendidos);

nomesDosProdutos.forEach(produto => {
    const tr = document.createElement("tr");
    const tdProduto = criarElementoComConteudo("td", produto);
    const tdQuantidade = criarElementoComConteudo("td", produtosVendidos[produto].quantidade);
    const tdValor = criarElementoComConteudo("td", `R$ ${produtosVendidos[produto].valor.toFixed(2).replace(".", ",")}`);

    tr.appendChild(tdProduto);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdValor);

    resumoVendasElemento.appendChild(tr);
});
}

const vendas = obterElemento("vendas");
const conteudovendas = obterConteudo(vendas);
const listaDeVendas = obterArrayDeFilhos(conteudovendas);
const produtosVendidos = processarVendas(listaDeVendas);

const cabecalhoResumo = obterElemento("resumo-vendas-cab");
const resumoVendas = obterElemento("resumo-vendas");

gerarResumoDeVendas(produtosVendidos, resumoVendas);


const listaProdutos = document.querySelector("#produtos");
const contagemProdutos = listaProdutos.querySelectorAll("li").length;
const paragrafoContagem = document.querySelector("#totalProdutos");
paragrafoContagem.innerText = `Total de produtos: ${contagemProdutos}`;

const tabelaVendas = obterElemento("vendas");
tabelaVendas.parentNode.removeChild(tabelaVendas);

const cabecalho = document.getElementById("cabecalho");

cabecalho.addEventListener("click", function() {
const corAtual = cabecalho.style.backgroundColor;
cabecalho.style.backgroundColor = corAtual === "rgb(51, 51, 51)" ? "#555" : "#333";
});
