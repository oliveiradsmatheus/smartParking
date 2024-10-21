import Pagina from "../layouts/Pagina.jsx"
import { Alert } from "react-bootstrap"

export default function TelaMenu(props) {
    return (
        <Pagina>
            <Alert className="mt-02 mb-02 success text-center" variant="success">
                <h2>
                    Tela Menu
                </h2>
            </Alert>
        </Pagina>
    )
}