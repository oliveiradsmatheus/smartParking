import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmacao = ({ exibir, lidarFechar, lidarConfirmar, estadoSensor }) => {
    const [estado, setEstado] = useState(estadoSensor === 'M' ? 'D' : 'M'); // Estado inicial do slider

    useEffect(() => {
        setEstado(estadoSensor === 'M' ? 'D' : 'M');
    }, [estadoSensor]);

    const onConfirmar = () => {
        lidarConfirmar(estado); // Passa o estado selecionado para o método de confirmação
    };

    return (
        <Modal show={exibir} onHide={lidarFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Atualizar Estado da Vaga Para <strong>{estadoSensor==='M' ? 'Disponível' : 'Manutenção'}</strong>?</p>
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