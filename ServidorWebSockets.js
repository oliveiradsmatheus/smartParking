npm install socket.io

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Simulação de dados da tabela
let tableData = [
  { id: 1, estado: 'D', ladoPos: 'R1', idRua: 'RUA1' },
  { id: 2, estado: 'O', ladoPos: 'R2', idRua: 'RUA1' },
  // Outros dados...
];

// Função para emitir dados atualizados
const emitDataUpdate = () => {
  io.emit('dataUpdate', tableData);
};

// Endpoint para atualizar a tabela
app.post('/api/update', (req, res) => {
  // Aqui você deve atualizar sua tabela no banco de dados

  // Exemplo: Atualizando a simulação de dados
  tableData.push({ id: 3, estado: 'M', ladoPos: 'L1', idRua: 'RUA1' });
  
  // Emitindo a atualização para todos os clientes conectados
  emitDataUpdate();

  res.send('Dados atualizados e notificados');
});

// Conectar WebSocket
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  
  // Emissão inicial dos dados
  socket.emit('dataUpdate', tableData);
});

// Iniciar o servidor
server.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});


import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:5000'); // Conectar ao servidor WebSocket

    // Ouvindo atualizações de dados
    socket.on('dataUpdate', (newData) => {
      setData(newData); // Atualiza o estado com os novos dados
    });

    return () => {
      socket.disconnect(); // Desconectar ao desmontar o componente
    };
  }, []);

  return (
    <div>
      <h1>Dados da Tabela</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            ID: {item.id}, Estado: {item.estado}, Lado: {item.ladoPos}, Rua: {item.idRua}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
