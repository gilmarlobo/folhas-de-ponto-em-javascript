const funcionarios = {
    "Escolha o Servidor": "Escolha",
    "Bruno Rodrigues de Oliveira": "Coordenador de prédio",
    "Carlos de Freitas": "Professor",
    "Cícero Cardoso Nunes": "Vigia",
    "Denilson Asena da Silva": "Gestor",
    "Deuzenilde Nunes Cardoso": "Professora",
    "Gilmar Pereira da Conceição": "Professor",
    "Gilson da Silva Duarte": "Coordenador",
    "Isalete de Brito Lopes": "Professora",
    "Ivone de Sousa Brandão": "Professora",
    "João Evangelista Santos Pereira": "Professor",
    "Kátia de Sousa Batista Nunes": "Profesora",
    "Lázaro Neres da Silva": "Professor",
    "Maria Avelina Gomes da Silva": "Professora",
    "Marinalva Feitosa Santos": "Professora",
    "Osmar Evangelista da Silva Cardoso": "A.S.G",
    "Rosenilde Costa Marinho": "Professora",
    "Florita Teixeira Araujo":"A.S.G.",
    "Jackson Apolonio Reis":"Professor",
    "Jhon Kennedy Barros Cruz":"Professor",
    "Josué Araujo Silva":"Professor",
    "Luciano do Nascimento Mesquita":"A.S.G.",
    "Luciane Sousa Trindade":"A.S.G",
    "Manoel Garcia Filho":"Professor",
    "Maria Sônia de Jesus Silva":"Professora",
    "Orlany Rodrigues Furtunato da Silva":"Professora",
    "Raimundo Nonato Cavalcante Araujo":"Professor ",
    "Vanda Araujo Neres":"Professora",
    "Vania Idelmar de Andrade Castelo":"Professora"
    };



function carregarFuncionarios() {
    const select = document.getElementById("nome");
    for (const nome in funcionarios) {
        const option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    }
}

function atualizarFuncao() {
    const nome = document.getElementById("nome").value;
    document.getElementById("funcao").value = funcionarios[nome] || "";
}

function gerarFolha() {
    const nome = document.getElementById("nome").value;
    const funcao = document.getElementById("funcao").value;
    const data = document.getElementById("mesAno").value;


    if (!nome || !funcao || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    localStorage.setItem("nome", nome);
    localStorage.setItem("funcao", funcao);
    localStorage.setItem("mesAno", data);
    localStorage.setItem("imprimirAutomaticamente", "true"); // Define a flag

    window.location.href = "folha.html";
}
function gerarFolhasAutomaticamente() {//aqui é o ponto
    const mesAno = document.getElementById("mesAnoAutomatico").value;
    if (!mesAno) {
        alert("Selecione o mês e ano para gerar as folhas!");
        return;
    }


    // Armazena o mês/ano para usar na geração individual

    localStorage.setItem("mesAno", mesAno);

    // Itera sobre os funcionários e gera a folha de cada um

    for (const nome in funcionarios) {
        if (nome !== "Escolha o Servidor") { // Ignora a opção "Escolha o Servidor"
            localStorage.setItem("nome", nome);
            localStorage.setItem("funcao", funcionarios[nome]);
            window.open("folha.html", "_blank"); // Abre a folha em uma nova aba para impressão
        }
    }
}
