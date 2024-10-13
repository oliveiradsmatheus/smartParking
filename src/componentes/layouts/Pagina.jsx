import Cabecalho from "./Cabecalho.jsx";
import Menu from "./Menu.jsx";
import Rodape from "./Rodape.jsx";

export default function Pagina(props) {
    return (
        <div>
            <Cabecalho titulo="Smart Parking" />
            <Menu />
            {
                props.children
            }
            <Rodape informacoes={"Trabalho desenvolvido para a disciplina Projeto Integrador I - Prof. Dr. Flávio Pandur Albuquerque Cabral"} />
        </div>
    );
}