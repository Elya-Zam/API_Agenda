import pool from "./conexao.js";

export async function buscaContatoPorId(id) {
    const conexao = await pool.getConnection()
    const sql = 'SELECT * FROM contato WHERE id = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    conexao.release();
    return resultado;
}

export async function buscarTodosContatos() {
    const conexao = await pool.getConnection()
    const sql = 'SELECT * FROM contato';
    const [resultado] = await conexao.execute(sql);
    conexao.release();
    return resultado;
}

// export async function buscarContatoPorNome(nome) {
//     const conexao = await pool.getConnection()
//     const sql = 'SELCT * FROM contato WHERE = ?';
//     const [resultado] = await conexao.exectute(sql, [nome]);
//     conexao.release();
//     return resultado;
// }