import Cabecalho from "./layout.Cabecalho";
import BarraNavegacao from "./layout.Barra-Navegacao";
import Rodape from "./layout.Rodape";

export default function Pagina(props) {
    return (
        <>
            <Cabecalho titulo="Smart Parking" />
            <BarraNavegacao/>
            { props.children }
            <Rodape informacoes={"Trabalho desenvolvido para a disciplina Projeto Integrador I - Prof. Dr. Flávio Pandur Albuquerque Cabral"} />
        </>
    );
}