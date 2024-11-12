import Pagina from "../layouts/layout.Pagina";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EstadoRua() {
    const navegar = useNavigate();
    const ruas = useSelector((state) => state.ruas.ruas);
    const [listaRuas, setListaRuas] = useState(ruas);
    const [pesquisa, setPesquisa] = useState("");
    const busca = listaRuas.filter((rua) => {
        const ruaLC = rua.nome.toLowerCase();
        const pesquisaLC = pesquisa.toLowerCase();
        if (ruaLC.includes(pesquisaLC))
            return rua;
    });

    useEffect(() => {
        setListaRuas(ruas);
    },[ruas])

    return (
        <>
            <Pagina>
                <Container className="d-grid" style={{
                    gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
                    gap: "1rem",
                    justifyContent: "center"
                }}>
                    {
                        busca.length ?
                            busca.map((rua) => {
                                return (
                                    <Card 
                                        style={{ width: '100%', height: '18rem', display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }} 
                                        border={rua.estadoRua === "Livre" ? "success" : "danger"}
                                    >
                                        <Card.Body>
                                            <Card.Title>Rua: {rua.nome}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">Bairro: {rua.bairro}<br /> Cidade: {rua.cidade} - {rua.uf}</Card.Subtitle>
                                            <Card.Text>
                                                Descrição:
                                                <br />
                                                Quantidade de Vagas: {rua.qtVagas}
                                                <br />
                                                Estado da Rua: {rua.estadoRua}
                                                <div>
                                                    <Form.Select style={{ width: "19rem", margin: "auto" }}>
                                                        {
                                                            rua.estadoRua === "Livre" ? (
                                                                <>
                                                                    <option disabled hidden selected value="Livre">Livre</option>
                                                                    <option value="Interditada">Interditada</option>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <option value="Livre">Livre</option>
                                                                    <option disabled hidden selected value="Interditada">Interditada</option>
                                                                </>
                                                            )
                                                        }
                                                        {/* <option disabled hidden selected>Selecione o estado da rua:</option>
                                                        <option value="Livre">Livre</option>
                                                        <option value="Interditada">Interditada</option> */}
                                                    </Form.Select>
                                                </div>
                                            </Card.Text>
                                            <Button type="submit" style={{ marginTop: "1rem" }}>Confirmar</Button>
                                        </Card.Body>
                                    </Card>
                                );
                            }) :
                            "Nenhum resultado encontrado."
                    }
                </Container>
            </Pagina>
        </>
    );
}
