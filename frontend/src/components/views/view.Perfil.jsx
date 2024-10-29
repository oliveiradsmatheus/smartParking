import { Button, Dropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import perfil from "../../assets/images/perfil.png"

export default function Perfil(props) {
    const adminLogado = useSelector((state) => state.login); // Estado do usuário
    const index = adminLogado.indexOf(' '); // só pra exibir o 1 nome
    const dispatch = useDispatch();

    const Deslogar = () => {
        dispatch({ type: "DESLOGAR" });
    };

    return (
        <>
            {
                adminLogado ?
                    <Dropdown>
                        <Dropdown.Toggle as={Button} style={{ border: 'none', backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }} >
                            <Image
                                src={perfil}
                                style={{ width: '32px', height: '32px', marginRight: '8px' }}
                            />
                            <span>
                                {index === -1 ? adminLogado : adminLogado.substring(0, index)}
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/" onClick={() => {
                                Deslogar();
                            }}>
                                Sair
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <Button href="#" as={Link} to="/login" variant="primary">
                        Entrar
                    </Button>
            }
        </>
    )
}