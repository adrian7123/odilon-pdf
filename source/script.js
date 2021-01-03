var table
var index =1
var n_linha = 1
var linha
window.document.getElementById("criar").addEventListener("click", criar)
window.document.getElementById("selecao").addEventListener("input", calcular) 
window.document.getElementById("area").addEventListener("input", calcular)
window.document.getElementById("perimetro").addEventListener("input", calcular)
window.document.getElementById("salvar").addEventListener("click", salvar_alteracao_na_tabela)
window.document.getElementById("cancelar").addEventListener("click", cancelar_alteracao_na_tabela)

window.document.getElementById("salvar").hidden = true
window.document.getElementById("cancelar").hidden = true
window.document.getElementById("criar").hidden = false

function criar() {
    
    table = window.document.getElementById("exibir")

    var local = document.getElementById("selecao").selectedIndex
    let local_name = document.getElementById("selecao")
    local_name = local_name.options[local_name.selectedIndex].value
    let area = document.getElementById("area").value
    let perimetro = document.getElementById("perimetro").value
    let potencia_iluminacao = document.getElementById("pilu").value
    let potencia_tug = document.getElementById("ptug").value
    let potencia_tue = document.getElementById("ptue").value

   if (local == 0 || area.length == 0 || perimetro.length == 0 || potencia_iluminacao.length == 0 || potencia_tug.length == 0 ){
        window.alert("Senhor, preencha todos os campos!")
    } else {
        
        //cria alinha na tabela
        var linha = window.document.createElement('tr')
        linha.innerHTML = `<td id="local">${local_name}</td>`
        linha.innerHTML += `<td>${area}</td>`
        linha.innerHTML += `<td>${perimetro}</td>`
        linha.innerHTML += `<td>${potencia_iluminacao}</td>`
        linha.innerHTML += `<td>${potencia_tug}</td>`
        linha.innerHTML += `<td>${potencia_tue}</td>`
        linha.innerHTML += `<td hidden="true" id="red">X</td>`
        linha.innerHTML += `<td hidden="true" id="azul">Editar</td>`
        exibir_tbody.appendChild(linha)

        console.log(linha)

        //apaga os campos do input após criar a linha na tabela
        document.getElementById("selecao").selectedIndex = 0
        document.getElementById("area").value = ''
        document.getElementById("perimetro").value = ''
        document.getElementById("pilu").value = ''
        document.getElementById("ptug").value = ''
        document.getElementById("ptue").value = ''
    }
    preenche_input()
}


function calcular(){
    
    //usados para calcular quantidade e potencia (iluminacao e tug)
    let local = window.document.getElementById("selecao").selectedIndex
    let valor_area = window.document.getElementById("area") 
    let valor_perimetro = window.document.getElementById("perimetro")

    valor_area = Number(valor_area.value)
    valor_perimetro = Number(valor_perimetro.value)

    var txt = window.document.getElementById("paragrafo")
    txt.innerHTML = `Pilmu: ${quantidade_pontos_iluminacao(potencia_ilum(valor_area))} Ptug: ${quantidade_tug(valor_perimetro, local)}`

    /*
        funções necessarias na hora de construir o PFD (relatório)
        potencia_ilum(valor_area) = retorna a potencia-iluminaçao do comodo
        quantidade_pontos_iluminacao(potencia) = retorna a qauntidade de lampadas
        quantidade_tug(valor_perimetro, local) = retorn a quantidaede de tugs
        potencia_tug(pontos_tug, local) = retona a potencia-tug do comodo
    */

    alterar_input_iluminacao(potencia_ilum(valor_area))
    alterar_input_tug(potencia_tug(quantidade_tug(valor_perimetro, local), local))
    
}

/*********************************************************************************************
* As funções a baixo calculam a potencia total e a quantidade de pontos da iluminação, alem
de alterar os valores automaticamente dos respectivos inputs.
*********************************************************************************************/

function potencia_ilum(area) { //calcula a potencia de iluminação em VA de cada comodo.

    let multiplicador = 0 
    let potencia = 0
    

    if (area >= 0 && area <= 6 ) {
        if (area != 0) {
            multiplicador = 1
            potencia = 100
        }else {
            multiplicador = 0
            potencia = 0
        }
    } else {
        multiplicador = 1 + Number.parseInt((area - 6) / 4)
        potencia = 100 + ((multiplicador - 1)*60)
    }

    return potencia
}

function quantidade_pontos_iluminacao(potencia) {//calcula a quantidade de pontos de iluminacao de cada comodo

    let pontos_iluminacao = 0
   
    if (potencia <= 250) {
        if (potencia != 0) {
            pontos_iluminacao = 1
        }else {
            pontos_iluminacao = 0
        }
        
    }else{

        pontos_iluminacao = Number.parseInt(potencia / 250)

        if ((potencia % 250) != 0) {
            pontos_iluminacao += 1
        }   
        
    }   

    return pontos_iluminacao
}

function alterar_input_iluminacao(potencia) { //altera o valor da potencia de iluminação no input.

    var valor_pilu = window.document.getElementById("pilu")
    valor_pilu.value = potencia
    
}

/********************************************************************************************
As funções a baixo calculam a potencia total e a quantidade de pontos de tomadas de uso 
geral, alem de alterar os valores automaticamente dos respectivos inputs.
*********************************************************************************************/

function quantidade_tug(perimetro, local) {//calcula a quantidade de TUGs de cada comodo

    let pontos_tug = 0

    //salas, quartos. 
    if (local >= 0 && local < 3) {

        if (local != 0) {
            pontos_tug = Number.parseInt(perimetro / 5)

            if ((perimetro % 5) != 0) {
                pontos_tug += 1
            }
        }else {
            pontos_tug = 0
        }
            
    }

    //copas, copas-cozinhas, area de serviços, lavanderias e banheiros.
    else if (local > 2 && local < 9) {

        pontos_tug = Number.parseInt(perimetro / 3.5)

        if ((perimetro % 3.5) != 0) {
            pontos_tug += 1
        }     
    }

    //hall, corredor, garagem, varandas, sotão, subsolo e etc. 
    else {
        if (perimetro != 0){
            pontos_tug = 1
        }
    }

    return pontos_tug // quantidade de pontos de tug.
}

function potencia_tug(pontos_tug, local) { //calcula a potencia total em VA das TUGs de cada comodo

    let potencia = 0
    
    //salas, quartos.  
    if (local > 0 && local < 3) {
        potencia = pontos_tug*100
    }

    //copas, copas-cozinhas, area de serviços, lavanderias e banheiros.
    if (local > 2 && local < 9) {

        if(pontos_tug > 6) {
            potencia = (pontos_tug-2)*100 + (2*600)
        }else {

            if (pontos_tug <= 3) {
                potencia = pontos_tug * 600
            } else{
                potencia = (pontos_tug-3)*100 + (3*600)
            } 
        }     
    }

    //hall, corredor, garagem, varandas, sotão, subsolo e etc. 
    if (local > 8 && local < 15) {
        potencia = pontos_tug * 100
    }else if (local > 14 && local < 18) {
        potencia = pontos_tug * 1000
    }

    return potencia
}

function alterar_input_tug(potencia) {  //altera o valor da potencia da TUG no input.
    var valor_ptug = window.document.getElementById("ptug")
    valor_ptug.value = potencia
}

/********************************************************************************************
As funções a baixo, preechem os inputs com as informações dos capos da tabela clicada, o que 
permite que esses campos sejam alterados, além de excluir a linha que foi para os inputs
*********************************************************************************************/

function preenche_input(){ //preenche os inputs com os campos da tabela

    for (let i = 1; i < table.rows.length; i ++) {

        table.rows[i].onmouseenter = function() { 
            index = this.rowIndex
            mostra_opcao()
            console.log(index)
            console.log(linha)
        }

        table.rows[i].cells[6].onclick = function() { 
            table.deleteRow(index)       
        }

        table.rows[i].cells[7].onclick = function() {
             
            linha = index

            bt_salvar = window.document.getElementById("salvar").hidden = false
            bt_cancelar = window.document.getElementById("cancelar").hidden = false
            bt_criar = window.document.getElementById("criar").hidden = true

            document.getElementById("selecao").selectedIndex = nomelocal_para_index()
            console.log(document.getElementById("selecao").selectedIdex)
            document.getElementById("area").value = table.rows[index].cells[1].innerText
            document.getElementById("perimetro").value = table.rows[index].cells[2].innerText
            document.getElementById("pilu").value = table.rows[index].cells[3].innerText
            document.getElementById("ptug").value = table.rows[index].cells[4].innerText
            document.getElementById("ptue").value = table.rows[index].cells[5].innerText

        }
        
    }

}

function mostra_opcao() {

    
    //so vai funcionar quando eu considerar ouvir um elemento externo a table
    //por enquanto a opção fica piscando
    /*table.onmouseout = function() {

        table.rows[1].cells[6].hidden=true
        table.rows[1].cells[7].hidden=true
        table.rows[table.rows.length-1].cells[6].hidden=true
        table.rows[table.rows.length-1].cells[7].hidden=true
        console.log("funciona")

    }*/

    if (index == 1) {

        if (table.rows.length > 2) {
            table.rows[index].cells[6].hidden=false
            table.rows[index].cells[7].hidden=false
            table.rows[index+1].cells[6].hidden=true
            table.rows[index+1].cells[7].hidden=true
        }else {
            table.rows[index].cells[6].hidden=false
            table.rows[index].cells[7].hidden=false
        }

    } else{

        if(index+1 == table.rows.length){
            table.rows[index].cells[6].hidden=false
            table.rows[index].cells[7].hidden=false
            table.rows[index-1].cells[6].hidden=true
            table.rows[index-1].cells[7].hidden=true
        }else{

            table.rows[index-1].cells[6].hidden=true
            table.rows[index-1].cells[7].hidden=true
            table.rows[index+1].cells[6].hidden=true
            table.rows[index+1].cells[7].hidden=true
            
            table.rows[index].cells[6].hidden=false
            table.rows[index].cells[7].hidden=false
        }

    }
    
}

function salvar_alteracao_na_tabela() { //altera os capos na tabela

    let local_name = window.document.getElementById("selecao")
    local_name = local_name.options[local_name.selectedIndex].value
    let area = window.document.getElementById("area").value
    let perimetro = window.document.getElementById("perimetro").value
    let potencia_iluminacao = window.document.getElementById("pilu").value
    let potencia_tug = window.document.getElementById("ptug").value
    let potencia_tue = window.document.getElementById("ptue").value

    table.rows[linha].cells[0].innerHTML = local_name
    table.rows[linha].cells[1].innerHTML = area 
    table.rows[linha].cells[2].innerHTML = perimetro 
    table.rows[linha].cells[3].innerHTML = potencia_iluminacao 
    table.rows[linha].cells[4].innerHTML = potencia_tug 
    table.rows[linha].cells[5].innerHTML = potencia_tue
    
    document.getElementById("selecao").selectedIndex = 0
    document.getElementById("area").value = ''
    document.getElementById("perimetro").value = ''
    document.getElementById("pilu").value = ''
    document.getElementById("ptug").value = ''
    document.getElementById("ptue").value = ''

    window.document.getElementById("salvar").hidden = true
    window.document.getElementById("cancelar").hidden = true
    window.document.getElementById("criar").hidden = false
}

function cancelar_alteracao_na_tabela() {

    document.getElementById("selecao").selectedIndex = 0
    document.getElementById("area").value = ''
    document.getElementById("perimetro").value = ''
    document.getElementById("pilu").value = ''
    document.getElementById("ptug").value = ''
    document.getElementById("ptue").value = ''

    window.document.getElementById("salvar").hidden = true
    window.document.getElementById("cancelar").hidden = true
    window.document.getElementById("criar").hidden = false

}

function nomelocal_para_index() {
   let local_name = table.rows[index].cells[0].innerText

    if(local_name == "Sala")                            
        return 1
    if(local_name == "Quarto")
        return 2
    if(local_name == "Cozinha")
        return 3
    if(local_name == "Copa")
        return 4
    if(local_name == "Copa-cozinha")
        return 5
    if(local_name == "Área de serviço")
        return 6
    if(local_name == "Lavanderia")
        return 7
    if(local_name == "Banheiro")
        return 8
    if(local_name == "Hall")
        return 9
    if(local_name == "Corredor")
        return 10
    if(local_name == "Garagem") 
        return 11
    if(local_name == "Varanda")
        return 12
    if(local_name == "Sótão")
        return 13
    if(local_name == "Subsolo")
        return 14
    if(local_name == "Hall de serviço")
        return 15
    if(local_name == "Sala de manutenção")
        return 16
    if(local_name == "Sala equipamentos")
        return 17

}

function gerarPdf() {
    var janela = window.open('', '', 'width=800, height=600')

    let dados = document.getElementById('exibir')

    janela.document.write(`
   
        <html>
        <head>
            <title>Pagina_base</title>
            <link rel="stylesheet" href="stilo.css">
        </head>
        <body>
            ${dados.outerHTML}
        </body>
        </html>
    `)
    janela.document.close()
    janela.print()
}