import express from "express";
import { buscaContatoPorId, buscarTodosContatos } from "./servico/buscaServico.js";
import { deletaContato } from "./servico/deletaServico.js";
import { validacontato } from "./validacao/valida.js";
import { cadastraContato } from "./servico/cadastroServico.js";
import { atualizaContato, atualizaContatoParcial } from "./servico/atualizaServico.js";

const app = new express();
app.use(express.json())
const port = 8888;

app.post('/contatos', async (req, res) => {
    const nome = req.body.nome;
    const telefone = req.body.telefone;
    const email = req.body.email;

    const contatoValido = validacontato(nome, telefone, email)
    if (contatoValido.status) {
        await cadastraContato(nome, telefone, email);
        res.status(204).end();
    } else {
        res.status(400).json({mensagem: contatoValido.mensagem})
    }
})

app.put('/contatos/:id', async (req, res) =>{
    const {id} = req.params; //Desestruturação: extrai as propiedades diretamente e as atribui a variaveis do mesmo nome;

    const {nome, telefone, email} = req.body; //Desestruturação
    const contatoValido = validacontato(nome, telefone, email)

    if (!contatoValido) {
        res.status(400).json({'mensagem': 'Algum valor não está informado'})
    } else {
        const resultado = await atualizaContato(id, nome, telefone, email)
        if (resultado.affectedRows > 0) {
            res.status(202).json({'mensagem': 'Parabens, atualizado'})
        } else {
            res.status(404).json({'mensagem': 'Registro não encontrado'})
        }
    }
})

app.patch('/contatos/:id', async (req, res) => {
    const {id} = req.params;
    const {nome, telefone, email} = req.body;

    const camposAtualizar = {};
    if(nome) camposAtualizar.nome = nome;
    if(telefone) camposAtualizar.telefone = telefone;
    if(email) camposAtualizar.email = email;

    if (Object.keys(camposAtualizar).length === 0 ) {
        return res.status(400).json({'mensagem': 'Algum campo inválido'})
    } else {
        const resultado = await atualizaContatoParcial(id, camposAtualizar)

        if (resultado.affectedRows > 0) {
            res.status(202).json({'mensagem': 'Parabens, atualizado'})
        } else {
            res.status(404).json({'mensagem': 'Registro não encontrado'})
        }
    }
})

app.get('/contatos', async (req, res) => {
    const contatos = await buscarTodosContatos();
    res.status(200).json(contatos)
})

app.get('/contatos/:id', async (req, res) =>{
    const id =  req.params.id;
   
    if (!isNaN(id)) {
        const contato = await buscaContatoPorId(id);
        if (contato.length > 0) {
            res.status(200).json(contato[0])
        } else {
            res.status(404).send('Contato não encontrado')
        }  
    } else {
        res.status(400).send('Requisição Inválida')
    }
});

app.delete('/contatos/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await deletaContato(id);

    if (resultado.affectedRows > 0) {
        res.status(200).send('Registro com sucesso!');
    } else{
        res.status(404).json({'mensagem':'Registo não encontrado!'})
    }
})

app.listen(port, () =>{
    let data = new Date()
    console.log('Servidor iniciado na porta http://localhost:'+port+' as ' +data)
})