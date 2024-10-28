import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalConfirmacao = ({ exibir, lidarFechar, lidarConfirmar }) => {
    const [estado, setEstado] = useState('M'); // Estado inicial do slider

    const lidarMudancaSlider = (evento) => {
        setEstado(evento.target.value);
    };

    const onConfirmar = () => {
        lidarConfirmar(estado); // Passa o estado selecionado para o método de confirmação
    };

    return (
        <Modal show={exibir} onHide={lidarFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Atualizar o estado da vaga:</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={estado} 
                        onChange={lidarMudancaSlider}
                    >
                        <option value="M">Manutenção</option>
                        <option value="D">Disponível</option>
                        <option value="A">Analisando</option>
                        <option value="O">Ocupada</option>
                    </Form.Control>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={lidarFechar}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={onConfirmar}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalConfirmacao;
