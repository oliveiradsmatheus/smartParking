const estadoInicial = {
    ruas: [], // Inicializa como um array vazio
};

const ruaReducer = (state = estadoInicial, action) => {
    switch (action.type) {
        case 'SET_RUAS':
            return {
                ...state,
                ruas: action.payload, // Atualiza o estado com as ruas recebidas
            };
        default:
            return state;
    }
};

export default ruaReducer;
