import { Router } from 'express';
import db from '../database.js';

const router = Router();

// Campos que toda requisição de criação/atualização de Serviços precisa ter.
const CAMPOS_OBRIGATORIOS = ['nome', 'preço'];

// Confere se o corpo da requisição tem os campos obrigatórios preenchidos.
function validarServicos(dados) {
  for (const campo of CAMPOS_OBRIGATORIOS) {
    if (!dados[campo] || String(dados[campo]).trim() === '') {
      return `O campo "${campo}" é obrigatório.`;
    }
  }
  return null;
}

// GET /api/servicos -> lista todos os clientes, do mais recente para o mais antigo
router.get('/', (req, res) => {
  const servicos = db
    .prepare('SELECT * FROM clientes ORDER BY id_cliente DESC')
    .all();
  res.json(servicos);
});

// GET /api/servicos/:id -> busca um único cliente
router.get('/:id', (req, res) => {
  const servicos = db
    .prepare('SELECT * FROM servicos WHERE id_cliente = ?')
    .get(req.params.id);

  if (!servicos) {
    return res.status(404).json({ erro: 'Serviço não encontrado.' });
  }
  res.json(servicos);
});

router.post('/', (req, res) => {
  const erro = validarServicos(req.body);
  if (erro) {
    return res.status(400).json({ erro });
   }})