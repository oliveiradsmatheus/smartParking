import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ruas } from "../../dados/mockMapas";

export default function DetalharRua(props) {
    const [id, setId] = useState();
    const [sensores, setSensores] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const idFromUrl = params.get('cod');
        setId(parseInt(idFromUrl));
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            const sensoresFiltrados = ruas.filter((rua) => {
                if(rua.id === id){
                    return rua
                }
            });
            setSensores(sensoresFiltrados[0].vagas);
        }
    }, [id]);

    return (
        <Container className="p-3">
            {sensores.length > 0 ? (
                sensores.map((sensor) => (
                    <p key={sensor.id} style={{color:sensor.cor}}>{sensor.cor}</p>
                ))
            ) : (
                <p>Nenhum sensor encontrado.</p>
            )}
        </Container>
    );
}
