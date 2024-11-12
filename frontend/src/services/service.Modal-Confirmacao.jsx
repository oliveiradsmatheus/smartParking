import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalConfirmacao = ({ quem, exibir, lidarFechar, lidarConfirmar, estadoNovo }) => {
    const [estado, setEstado] = useState(estadoNovo === 'M' ? 'D' : 'M'); // Estado inicial do slider

    useEffect(() => {
        setEstado(estadoNovo === 'M' ? 'D' : 'M');
    }, [estadoNovo]);

    const onConfirmar = () => {
        lidarConfirmar(estado); // Passa o estado selecionado para o método de confirmação
    };

    return (
        <Modal show={exibir} onHide={lidarFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmação</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    quem === "Detalha-Rua" ?
                        <p>Atualizar Estado da Vaga Para <strong>{estadoNovo==='M' ? 'Disponível' : 'Manutenção'}</strong>?</p>
                    :
                        <p>Atualizar Estado da Rua Para <strong>{estadoNovo==='M' ? 'Disponível' : 'Manutenção'}</strong>?</p>
                }
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