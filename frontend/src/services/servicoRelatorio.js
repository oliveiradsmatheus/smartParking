export async function consultar(info) {
    const url = `http://localhost:5000/api/relatorios/${info.tipoRel}/${info.idRua}/${info.dtInicio}/${info.dtFim}`;
    const res = await fetch(url, { method: 'GET' });
    return await res.json();
}
