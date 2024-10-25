import { Alert } from "react-bootstrap";

export default function Rodape(props) {
    return (
        <footer className="mt-4 position-static">
            <Alert className="mb-0 text-center pt-3 pb-2" variant="dark">
                <h6>
                    {props.informacoes || "Informações não fornecidas."}
                </h6>
            </Alert>
        </footer>
    );
}