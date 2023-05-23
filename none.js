let lista = localStorage.getItem("minhaLista");

const formu = document.querySelector("form");
const ulPessoa  = document.querySelector("ul");

if(lista) {
    lista = JSON.parse(lista);
}else {
    lista = [];
}
listar()


formu.addEventListener("submit", function(e){
    e.preventDefault()
    let newPeople = new Object();
    newPeople.nome = this.nome.value;
    newPeople.telefone = this.telefone.value;

    if(this.id.value !== "" && this.id.value >=0){
        lista[this.id.value] = newPeople;
    }else {
        lista.push(newPeople); 
    }
    this.reset();
    
    salvarLS();

    listar();

    localStorage.setItem("minhaLista", JSON.stringify(lista));
    
});

function listar(filtro=''){
    ulPessoa.innerHTML = "";
    lista.forEach((item,key) => {
        
    if(item.nome.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 || filtro ==""){

        linha = document.createElement('li');
        
let s = `<button onClick="excluir(${key})">[excluir]</button> 
        <button onClick="editar(${key})">[editar]</button>`
        

        linha.innerHTML = "Nome: " + item.nome + " telefone: " + item.telefone + s;
        ulPessoa.appendChild(linha);  
        }

});

}
function excluir(id){
    formu.reset();
    lista.splice(id, 1);
    salvarLS();
    listar();

}
function editar(id){
    formu.id.value = id;
    formu.nome.value = lista[id].nome;
    formu.telefone.value = lista[id].telefone;
}

function salvarLS(lista){
    localStorage.setItem("minhaLista", JSON.stringify(lista));

}
    
