import express from "express";
import { buscaContatoPorId, buscarTodosContatos } from "./servico/buscaServico.js";

const app = new express();
const port = 8888;

app.get('/contatos/:id', async (req, res) =>{
    const id =  req.params.id;
    if (id){
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
        
    } else {
        const contatos = await buscarTodosContatos()
        res.contatos(200).json(contatos)
    }
})

app.listen(port, () =>{
    let data = new Date()
    console.log('Servidor iniciado na porta http://localhost:'+port+' as ' +data)
})