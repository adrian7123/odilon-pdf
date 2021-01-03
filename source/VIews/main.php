<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagina_base</title>
    <link rel="stylesheet" href="../css/stilo.css">
</head>
<body>

    <header>
        <h1>Título</h1>
    </header>

    <section id="ajuda">

        <div id="a">
            <p id="paragrafo"> aqui</p>
            <table id="exibir" >
                <thead exibir_thead>
                    <tr>
                        <td>Cômodo</td>
                        <td>Área (m²)</td>
                        <td>Perímetro (m)</td>
                        <td>P. iluminação (va)</td>
                        <td>P. TUG - va</td>
                        <td>P. TUE - w</td>
                    </tr>
                </thead>
                <tbody id="exibir_tbody">

                </tbody>
            </table>
        </div>

        <div id="b"> <br> <br>   
            <table border="0" cellspacing="0" cellpadding="0" id="entrada">
                <thead>
                    <tr>
                        <td>Local</td>
                        <td>Área (m²)</td>
                        <td>Perímetro (m)</td>
                        <td>P. iluminação (va)</td>
                        <td>P. TUG - va</td>
                        <td>P. TUE - w</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <select name="" id="selecao" value="oi">
                                <option selected value="Escolha" >Escolha</option>
                                <option value="Sala">Sala</option>
                                <option value="Quarto">Quarto</option>
                                <option value="Cozinha">Cozinha</option>
                                <option value="Copa">Copa</option>
                                <option value="Copa-cozinha">Copa-cozinha</option>
                                <option value="Área de serviço">Área de serviço</option>
                                <option value="Lavanderia">Lavanderia</option>
                                <option value="Banheiro">Banheiro</option>
                                <option value="Hall">Hall</option> 
                                <option value="Corredor">Corredor</option>
                                <option value="Garagem">Garagem</option>
                                <option value="Varanda">Varandas</option>
                                <option value="Sótão">Sótão</option>
                                <option value="Subsolo">Subsolo</option>
                                <option value="Hall de serviço">Hall de serviço</option> 
                                <option value="Sala de manutenção">Sala de manutenção</option>
                                <option value="Sala equipamentos">Sala equipamentos</option>
                            </select>
                        </td>
                        <td><input type="number" name="" id="area"></td>
                        <td><input type="number" name="" id="perimetro"></td>
                        <td><input type="number" name="" id="pilu"></td>
                        <td><input type="number" name="" id="ptug"></td>
                        <td><input type="number" name="" id="ptue"></td>
                        </tr>
                </tbody>
            </table>
            <div id="teste_div"></div>
            <br>
            <button id="cancelar">Cancelar</button>
            <button id="salvar">Salvar</button> 
            <button id="criar">Criar</button>
            <button onclick="gerarPdf()" >imprimir</button>
        </div>
        
    </section>

    <footer><p>&copy; Categórico</p></footer>
    
    <script src="../js/script.js"></script>
  
</body>
</html>