import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";

export default function Cadastro(props) {
    const usuarioVazio = {
        login: "",
        nome: "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
        senha: ""
    };

    const [formValidado, setFormValidado] = useState(false);
    const [usuario, setUsuario] = useState(usuarioVazio);
    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");

    function confirmarSenha() {
        return senha === senha2;
    }

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            if (confirmarSenha()) {
                usuario.senha = senha;
                props.setListaUsuarios([...props.listaUsuarios, usuario]);
                props.setExibirLogin(true);
                setUsuario(usuarioVazio);
                setFormValidado(false);
            }
            else {
                setFormValidado(true);
            }
        } else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({ ...usuario, [elemento]: valor });
        console.log(`componente: ${elemento} : ${valor}`);
    }

    function voltar() {
        props.setExibirLogin(true);
    }

    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center">
                <Col md={10} lg={8} xs={12}>
                    <Card className="shadow p-3 mt-5 mx-auto rounded bg-body-tertiary">
                        <Card.Body>
                            <div className="mb-3">
                                <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
                                    <h4>Cadastre-se</h4>
                                    <Row className="mt-5">
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Nome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="nome"
                                                name="nome"
                                                placeholder="Nome Completo"
                                                value={usuario.nome}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Login</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="login"
                                                name="login"
                                                placeholder="Digite o nome de usuário desejado"
                                                value={usuario.login}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Senha</Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="senha"
                                                name="senha"
                                                placeholder="Digite sua nova senha"
                                                value={senha}
                                                onChange={(evento) => { setSenha(evento.target.value) }}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Confirmação de Senha</Form.Label>
                                            <Form.Control
                                                type="password"
                                                id="confirmacaoSenha"
                                                name="confirmacaoSenha"
                                                placeholder="Digite a mesma senha"
                                                value={senha2}
                                                onChange={(evento) => { setSenha2(evento.target.value) }}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <h2>Endereço</h2>
                                    <Row className="mt-4">
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Endereço</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="endereco"
                                                name="endereco"
                                                placeholder="Digite o nome da Rua ou Av."
                                                value={usuario.endereco}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Número</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="numero"
                                                name="numero"
                                                placeholder="Informe o número da residência"
                                                value={usuario.numero}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Bairro</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="bairro"
                                                name="bairro"
                                                placeholder="Informe o Bairro"
                                                value={usuario.bairro}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>

                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Cidade</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="cidade"
                                                name="cidade"
                                                placeholder="Informe a Cidade"
                                                value={usuario.cidade}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label className="text-center">Estado</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="uf"
                                                name="uf"
                                                placeholder="Informe o Estado"
                                                value={usuario.uf}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label>CEP</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="cep"
                                                name="cep"
                                                placeholder="Informe o CEP"
                                                value={usuario.cep}
                                                onChange={manipularMudanca}
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col md={1}>
                                            <div className="mb-2 mt-2">
                                                <Button type="submit">
                                                    Cadastrar
                                                </Button>
                                            </div>
                                        </Col>
                                        <Col md={{ offset: 1 }}>
                                            <div className="mb-2 mt-2">
                                                <Button onClick={() => {
                                                    voltar();
                                                }}>
                                                    Voltar
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}