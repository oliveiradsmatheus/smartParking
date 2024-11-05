import toast from "react-hot-toast";
import axios from "axios";

const url = "localhost"; //192.168.131.229 do meu

//===========================// USUARIOS //============================//
export const getRelatorio = async (tipoRel, idRua, dtInicio, dtFim) => {
    try {
        return await axios.get(`http://${url}:5000/relatorios`, {
            params: {
                tipo: tipoRel,
                rua: idRua,
                dtInicio: dtInicio,
                dtFim: dtFim
            }
        });
    }
    catch (erro) {
        if (erro.response) {
            const status = erro.response?.status;
            if (status === 404)
                toast.error("Erro ao Realizar Relatorio: Rotas Incorretas!");
            else
                toast.error(`Erro ao Realizar Relatorio: ${status} - ${erro.response?.data || "Erro desconhecido"}`);
        }
        else if (erro.request)
            toast.error("Erro ao Realizar Relatorio: API Offline!");
        else
            toast.error("Erro ao Realizar Relatorio: " + erro.message);
    };
    return null;
};
//=====================================================================//

//============// RUAS //============//
export const getRuas = async () => {
    try {
        return await axios.get(`http://${url}:5000/ruas`);
    }
    catch (erro) {
        if (erro.response) {  // A requisição foi feita e o servidor respondeu com um status diferente de 2xx
            const status = erro.response?.status; // Verificação de segurança para evitar erros de leitura
            if (status === 404)
                toast.error("Erro ao buscar ruas: Rotas Incorretas!");
            else
                toast.error(`Erro ao buscar ruas: ${status} - ${erro.response?.data || "Erro desconhecido"}`);
        }
        else if (erro.request)  // A requisição foi feita, mas nenhuma resposta foi recebida
            toast.error("Erro ao buscar ruas: API Offline!");
        else  // Algum outro erro ocorreu na configuração da requisição
            toast.error("Erro ao buscar ruas: " + erro.message);
    };
    return null;
};
//==================================//


//==============// USUARIOS //==============//
export const getUsuarios = async (nick, senha) => {
    try {
        return await axios.post(`http://${url}:5000/usuarios`,
            { nick: nick, senha: senha }
        );
    }
    catch (erro) {
        if (erro.response) {
            const status = erro.response?.status;
            if (status === 401)
                toast.error(erro.response.data.mensagem);                
            else if (status === 404)
                toast.error("Erro ao buscar usuário: Rotas Incorretas!");
            else
                toast.error(`Erro ao buscar usuário: ${status} - ${erro.response?.data || "Erro desconhecido"}`);
        }
        else if (erro.request)
            toast.error("Erro ao buscar usuário: API Offline!");
        else
            toast.error("Erro ao buscar usuário: " + erro.message);
    };
    return null;
};
//==========================================//

//================// SENSORES //================//
export const getSensores = async (idFromUrl) => {
    try {
        return await axios.get(`http://${url}:5000/sensores/${idFromUrl}`);
    }
    catch (erro) {
        if (erro.response) {
            const status = erro.response?.status;
            if (status === 404)
                toast.error("Erro ao buscar sensores: Rotas Incorretas!");
            else
                toast.error(`Erro ao buscar sensores: ${status} - ${erro.response?.data || "Erro desconhecido"}`);
        }
        else if (erro.request)
            toast.error("Erro ao buscar sensores: API Offline!");
        else
            toast.error("Erro ao buscar sensores: " + erro.message);
    };
    return null;
};

export const putSensor = async (idSensor, novoEstado) => {
    try {
        return await axios.put(`http://${url}:5000/sensores/${idSensor}/${novoEstado}`);
    }
    catch (erro) {
        if (erro.response) {
            const status = erro.response?.status;
            if (status === 404)
                return{ status: false,
                        mensagem: "Erro ao atualizar sensor: Rotas Incorretas!" }
            else
                return{ status: false,
                        mensagem: `Erro ao atualizar sensor: ${status} - ${erro.response?.data || "Erro desconhecido"}` }
        }
        else if (erro.request)
            return{ status: false,
                    mensagem: "Erro ao atualizar sensor: API Offline!" }
        else
            return{ status: false,
                    mensagem: "Erro ao atualizar sensor: " + erro.message }
    }
}
//==============================================//