const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const produtoMid = require('../midware/validar.produto')
const produtos = {}

router.post('/', produtoMid)
router.put('/', produtoMid)

router.get('/:id', (req, res) => {
    res.json({ produto: produtos[req.params.id] });
});
router.get('/', (req, res) => {
    res.json({ produtos: Object.values(produtos) });
});
router.put('/:id', (req, res) => {
    const id = req.params.id; 
    if (id && produtos[id]) {
        const produto = req.body;
        produto.id = id;
        produtos[id] = produto;
        res.json({ msg: "Produto Teste Editado!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id && produtos[id]) {
        delete produtos[id];
        res.json({ msg: "Produto deletado com sucesso!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
});

router.post('/', (req, res) => {
    const produto = req.body;
    const idProduto = uuidv4();
    produto.id = idProduto;
    produtos[idProduto] = produto;
    res.json({ msg: "Produto adicionado com sucesso!" });
});



module.exports = router;