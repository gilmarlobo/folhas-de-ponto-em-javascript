// ===============================
// SUPABASE CONFIG
// ===============================
const { createClient } = supabase;

const SUPABASE_URL = "https://xgixtmjvsmragjkrmvqe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnaXh0bWp2c21yYWdqa3JtdnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDI1MzEsImV4cCI6MjA4NDY3ODUzMX0.wUCedYSrfFEzkkhPFXvV0PxaItDjLJveI6N0vn3i0dQ";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// ===============================
// VARIÁVEIS GLOBAIS
// ===============================
let funcionariosCache = [];

// ===============================
// CARREGAR FUNCIONÁRIOS
// ===============================
async function carregarFuncionarios() {
    const select = document.getElementById("nome");
    select.innerHTML = `<option value="">Escolha o Servidor</option>`;

    const { data, error } = await supabaseClient
        .from("professores_arcanjo")
        .select("*")
        .order("nome", { ascending: true });

    if (error) {
        alert("Erro ao carregar funcionários");
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
// ATUALIZAR FUNÇÃO
// ===============================
function atualizarFuncao() {
    const id = document.getElementById("nome").value;
    // Forçamos ambos a virarem String para não ter erro de tipo
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
        alert("Preencha todos os campos! Selecione um servidor e o mês/ano.");
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
        alert("Selecione o mês e ano");
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
// CRUD – SALVAR (CRIAR / EDITAR)
// ===============================
async function salvarFuncionario() {
    const id = document.getElementById("funcionarioId").value;
    const nome = document.getElementById("novoNome").value.trim();
    const funcao = document.getElementById("novaFuncao").value.trim();

    if (!nome || !funcao) {
        alert("Informe nome e função");
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
        alert("Erro ao salvar funcionário");
        console.error(response.error);
        return;
    }

    limparFormulario();
    carregarFuncionarios();
}

// ===============================
// CRUD – EXCLUIR
// ===============================
async function excluirFuncionario() {
    const id = document.getElementById("funcionarioId").value;

    if (!id) {
        alert("Selecione um funcionário");
        return;
    }

    if (!confirm("Deseja realmente excluir este funcionário?")) return;

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
// PREENCHER FORMULÁRIO AO SELECIONAR
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    carregarFuncionarios();

    // --- Lógica para Data Atual Padrão ---
    const campoData = document.getElementById("mesAno");
    const agora = new Date();
    const ano = agora.getFullYear();
    // getMonth() retorna 0 para Janeiro, por isso somamos +1
    // padStart garante que meses com 1 dígito fiquem como "01", "02", etc.
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
// LIMPAR FORMULÁRIO
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
