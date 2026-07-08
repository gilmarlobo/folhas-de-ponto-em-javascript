// ===============================\r\n// SUPABASE CLIENT (from supabase.js)\r\n// ===============================\r\nconst supabaseClient = window.supabaseClient;\r\n\r\n// ===============================
// VARIÃVEIS GLOBAIS
// ===============================
let funcionariosCache = [];

// ===============================
// CARREGAR FUNCIONÃRIOS
// ===============================
async function carregarFuncionarios() {
    const select = document.getElementById("nome");
    select.innerHTML = `<option value="">Escolha o Servidor</option>`;

    const { data, error } = await supabaseClient
        .from("professores_arcanjo")
        .select("*")
        .order("nome", { ascending: true });

    if (error) {
        alert("Erro ao carregar funcionÃ¡rios");
        console.error(error);
        return;
    }

    funcionariosCache = data;

    data.forEach(func => {
        const option = document.createElement("option");
        option.value = func.id;
        option.textContent = func.nome;
        select.appendChild(option);
    });
}

// ===============================
// ATUALIZAR FUNÃ‡ÃƒO
// ===============================
function atualizarFuncao() {
    const id = document.getElementById("nome").value;
    // ForÃ§amos ambos a virarem String para nÃ£o ter erro de tipo
    const funcionario = funcionariosCache.find(f => String(f.id) === String(id));

    if (funcionario) {
        document.getElementById("funcao").value = funcionario.funcao;
    } else {
        document.getElementById("funcao").value = "";
    }
}


// ===============================
// GERAR FOLHA INDIVIDUAL
// ===============================
function gerarFolha() {
    const id = document.getElementById("nome").value;
    const data = document.getElementById("mesAno").value;

    // Ajuste na busca: comparando como String para evitar erro de tipo
    const funcionario = funcionariosCache.find(f => String(f.id) === String(id));

    if (!funcionario || !data) {
        alert("Preencha todos os campos! Selecione um servidor e o mÃªs/ano.");
        return;
    }

    localStorage.setItem("nome", funcionario.nome);
    localStorage.setItem("funcao", funcionario.funcao);
    localStorage.setItem("mesAno", data);

    window.location.href = "folha.html";
}

// ===============================
// GERAR FOLHAS AUTOMATICAMENTE
// ===============================
function gerarFolhasAutomaticamente() {
    const mesAno = document.getElementById("mesAnoAutomatico")?.value;

    if (!mesAno) {
        alert("Selecione o mÃªs e ano");
        return;
    }

    localStorage.setItem("mesAno", mesAno);

    funcionariosCache.forEach(func => {
        localStorage.setItem("nome", func.nome);
        localStorage.setItem("funcao", func.funcao);
        window.open("folha.html", "_blank");
    });
}

// ===============================
// CRUD â€“ SALVAR (CRIAR / EDITAR)
// ===============================
async function salvarFuncionario() {
    const id = document.getElementById("funcionarioId").value;
    const nome = document.getElementById("novoNome").value.trim();
    const funcao = document.getElementById("novaFuncao").value.trim();

    if (!nome || !funcao) {
        alert("Informe nome e funÃ§Ã£o");
        return;
    }

    let response;

    if (id) {
        response = await supabaseClient
            .from("professores_arcanjo")
            .update({ nome, funcao })
            .eq("id", id);
    } else {
        response = await supabaseClient
            .from("professores_arcanjo")
            .insert([{ nome, funcao }]);
    }

    if (response.error) {
        alert("Erro ao salvar funcionÃ¡rio");
        console.error(response.error);
        return;
    }

    limparFormulario();
    carregarFuncionarios();
}

// ===============================
// CRUD â€“ EXCLUIR
// ===============================
async function excluirFuncionario() {
    const id = document.getElementById("funcionarioId").value;

    if (!id) {
        alert("Selecione um funcionÃ¡rio");
        return;
    }

    if (!confirm("Deseja realmente excluir este funcionÃ¡rio?")) return;

    const { error } = await supabaseClient
        .from("professores_arcanjo")
        .delete()
        .eq("id", id);

    if (error) {
        alert("Erro ao excluir");
        console.error(error);
        return;
    }

    limparFormulario();
    carregarFuncionarios();
}

// ===============================
// PREENCHER FORMULÃRIO AO SELECIONAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    carregarFuncionarios();

    // --- LÃ³gica para Data Atual PadrÃ£o ---
    const campoData = document.getElementById("mesAno");
    const agora = new Date();
    const ano = agora.getFullYear();
    // getMonth() retorna 0 para Janeiro, por isso somamos +1
    // padStart garante que meses com 1 dÃ­gito fiquem como "01", "02", etc.
    const mes = String(agora.getMonth() + 1).padStart(2, '0'); 
    
    campoData.value = `${ano}-${mes}`;
    // -------------------------------------

    document.getElementById("nome").addEventListener("change", () => {
        const id = document.getElementById("nome").value;
        const funcionario = funcionariosCache.find(f => String(f.id) === String(id));

        if (!funcionario) {
            limparFormulario();
            return;
        }

        document.getElementById("funcionarioId").value = funcionario.id;
        document.getElementById("novoNome").value = funcionario.nome;
        document.getElementById("novaFuncao").value = funcionario.funcao;
        document.getElementById("funcao").value = funcionario.funcao;
    });
});

// ===============================
// LIMPAR FORMULÃRIO
// ===============================
function limparFormulario() {
    document.getElementById("funcionarioId").value = "";
    document.getElementById("novoNome").value = "";
    document.getElementById("novaFuncao").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("funcao").value = "";
}

// ===============================
// EXPORTAR PARA O HTML
// ===============================
window.atualizarFuncao = atualizarFuncao;
window.gerarFolha = gerarFolha;
window.gerarFolhasAutomaticamente = gerarFolhasAutomaticamente;
window.salvarFuncionario = salvarFuncionario;
window.excluirFuncionario = excluirFuncionario;

