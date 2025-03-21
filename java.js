const funcionarios = {
    "Escolha o Servidor": "Escolha",
    "Adevielton Lima Oliveira":"Professor",
    "Adice da Silva Coelho Moraes": "Agente Administrativo",
    "Antonia Laura de Lima Sousa": "Professora",
    "Bruno Rodrigues de Oliveira": "Coordenador de prédio",
    "Carlos de Freitas": "Professor",
    "Cícero Cardoso Nunes": "Vigia",
    "Denilson Asena da Silva": "Gestor",
    "Deuzenilde Nunes Cardoso": "Professora",
    "Edna Cardoso Coqueiro": "A.S.G",
    "Gilmar Pereira da Conceição": "Professor de Robótica",
    "Gilson da Silva Duarte": "Coordenador",
    "Isalete de Brito Lopes": "Professora",
    "Ivone de Sousa Brandão": "Professora",
    "João Evangelista Santos Pereira": "Professor",
    "Jocilene Moreira Freitas": "Assistente de alunoluno",
    "Kátia de Sousa Batista Nunes": "Profesora",
    "Lázaro Neres da Silva": "Professor",
    "Leonilda Barbosa da Silva": "Assistente de Aluno Especial",
    "Lilian dos Santos Meneses": "A.S.G",
    "Maria Avelina Gomes da Silva": "Professora",
    "Maria Clara de Sousa Rocha": "Assistente de Aluno Especial",
    "Maria do Socorro Mendes Pereira": "A.S.G",
    "Marinalva Feitosa Santos": "Professora",
    "Osmar Evangelista da Silva Cardoso": "A.S.G",
    "Pedro Afonso Amaral Matos":"Professor de Jiu-Jitsu",
    "Rosenilde Costa Marinho": "Professora",
    "Florita Teixeira Araujo":"A.S.G.",
    "Jackson Apolonio Reis":"Professor",
    "Jhon Kennedy Barros Cruz":"Professor",
    "Josué Araujo Silva":"Professor",
    "Luciano do Nascimento Mesquita":"A.S.G.",
    "Luciane Sousa Trindade":"A.S.G",
    "Manoel Garcia Filho":"Professor",
    "Maisa Barbosa Campo Marques":"A.S.G./Merendeira",
    "Maria do Socorro Mendes Pereira":"A.S.G/Merendeira",
    "Maria Sônia de Jesus Silva":"Professora",
    "Orlany Rodrigues Furtunato da Silva":"Professora",
    "Raimundo Nonato Cavalcante Araujo":"Professor ",
    "Solange Alves Monteiro":"Professora",
    "Rosimeire Oliveira Lima": "A.S.G",
    "Vanda Araujo Neres":"Professora",
    "Vania Idelmar de Andrade Castelo":"Professora",
    "Verônica Pereira Viana": "Assistente de Aluno Especial",
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
