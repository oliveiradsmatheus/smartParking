-- DELETE FROM ocupacao;
-- DELETE FROM sensor;
-- DELETE FROM rua;
-- DELETE FROM usuario;

 INSERT INTO usuario (usu_nick, usu_nome, usu_email, usu_senha)
  VALUES
   (
     'admin',
     'Administrador',
     'admin@hotmail.com',
     '123'
   );

INSERT INTO rua (rua_id, rua_estado, rua_nome, rua_bairro, rua_cidade, rua_uf, rua_qtdVagas)
VALUES
  ('PP1', 'D', 'Rua José Bongiovani', 'Jardim Novo Bongiovani', 'Presidente Prudente', 'SP', 3),
  ('PP2', 'D', 'Rua Joaquim Nabuco', 'Vila Marcondes', 'Presidente Prudente', 'SP', 6),
  ('PP3', 'D', 'Rua Rui Barbosa', 'Bosque', 'Presidente Prudente', 'SP', 10),
  ('PP4', 'D', 'Rua Alvino Gomes Teixeira', 'Parque Cedral', 'Presidente Prudente', 'SP', 8),
  ('PP5', 'D', 'Rua Tenente Nicolau Maffei', 'Vila Geni', 'Presidente Prudente', 'SP', 14),
  ('PP6', 'D', 'Rua Felício Tarabai', 'Jardim Itaipu', 'Presidente Prudente', 'SP', 7),
  ('PP7', 'D', 'Rua Antônio Rodrigues', 'Vila Liberdade', 'Presidente Prudente', 'SP', 12),
  ('PP8', 'D', 'Rua São Paulo', 'Centro', 'Presidente Prudente', 'SP', 15),
  ('PP9', 'D', 'Rua Bernardino de Campos', 'Jardim Paulista', 'Presidente Prudente', 'SP', 9),
  ('PP10', 'D', 'Rua João Gonçalves Foz', 'Parque Higienópolis', 'Presidente Prudente', 'SP', 6),
  ('PP11', 'D', 'Rua Alfredo Marcondes Cabral', 'Jardim Aviação', 'Presidente Prudente', 'SP', 4),
  ('PP12', 'D', 'Rua Altair Anacleto', 'Jardim Esplanada', 'Presidente Prudente', 'SP', 10),
  ('PP13', 'D', 'Rua Maria Tereza', 'Parque Furquim', 'Presidente Prudente', 'SP', 8),
  ('PP14', 'D', 'Rua Joaquim Martins', 'Jardim Cambuci', 'Presidente Prudente', 'SP', 13),
  ('PP15', 'D', 'Rua Domingos de Morais', 'Vila Nova Prudente', 'Presidente Prudente', 'SP', 5),
  ('PP16', 'D', 'Rua Pedro de Oliveira', 'Residencial Nosaki', 'Presidente Prudente', 'SP', 11),
  ('PP17', 'D', 'Rua Dos Operários', 'Jardim Paraíso', 'Presidente Prudente', 'SP', 7),
  ('PP18', 'D', 'Rua José Dias Cintra', 'Parque Cedral', 'Presidente Prudente', 'SP', 9),
  ('PP19', 'D', 'Rua Paschoal Bongiovani', 'Jardim Bongiovani', 'Presidente Prudente', 'SP', 14),
  ('PP20', 'D', 'Rua Carlos Gomes', 'Jardim Brasília', 'Presidente Prudente', 'SP', 10);

INSERT INTO sensor (sen_estado, sen_ladoPos, rua_id)
VALUES
  ('D', 'R1', 'PP1'),
  ('D', 'R2', 'PP1'),
  ('D', 'R3', 'PP1'),
  ('D', 'R1', 'PP2'),
  ('D', 'R2', 'PP2'),
  ('D', 'R3', 'PP2'),
  ('D', 'R4', 'PP2'),
  ('D', 'R5', 'PP2'),
  ('D', 'R6', 'PP2'),
  
--   Sensores para a PP3 (10 vagas)
  ('D', 'R1', 'PP3'),
  ('D', 'R2', 'PP3'),
  ('D', 'R3', 'PP3'),
  ('D', 'R4', 'PP3'),
  ('D', 'R5', 'PP3'),
  ('D', 'R6', 'PP3'),
  ('D', 'R7', 'PP3'),
  ('D', 'R8', 'PP3'),
  ('D', 'R9', 'PP3'),
  ('D', 'R10', 'PP3'),

--   Sensores para a PP4 (8 vagas)
  ('D', 'R1', 'PP4'),
  ('D', 'R2', 'PP4'),
  ('D', 'R3', 'PP4'),
  ('D', 'R4', 'PP4'),
  ('D', 'R5', 'PP4'),
  ('D', 'R6', 'PP4'),
  ('D', 'R7', 'PP4'),
  ('D', 'R8', 'PP4'),

  -- Sensores para a PP5 (14 vagas)
  ('D', 'R1', 'PP5'),
  ('D', 'R2', 'PP5'),
  ('D', 'R3', 'PP5'),
  ('D', 'R4', 'PP5'),
  ('D', 'R5', 'PP5'),
  ('D', 'R6', 'PP5'),
  ('D', 'R7', 'PP5'),
  ('D', 'R8', 'PP5'),
  ('D', 'R9', 'PP5'),
  ('D', 'R10', 'PP5'),
  ('D', 'R11', 'PP5'),
  ('D', 'R12', 'PP5'),
  ('D', 'R13', 'PP5'),
  ('D', 'R14', 'PP5'),

  -- Sensores para a PP6 (7 vagas)
  ('D', 'R1', 'PP6'),
  ('D', 'R2', 'PP6'),
  ('D', 'R3', 'PP6'),
  ('D', 'R4', 'PP6'),
  ('D', 'R5', 'PP6'),
  ('D', 'R6', 'PP6'),
  ('D', 'R7', 'PP6'),

  -- Sensores para a PP7 (12 vagas)
  ('D', 'R1', 'PP7'),
  ('D', 'R2', 'PP7'),
  ('D', 'R3', 'PP7'),
  ('D', 'R4', 'PP7'),
  ('D', 'R5', 'PP7'),
  ('D', 'R6', 'PP7'),
  ('D', 'R7', 'PP7'),
  ('D', 'R8', 'PP7'),
  ('D', 'R9', 'PP7'),
  ('D', 'R10', 'PP7'),
  ('D', 'R11', 'PP7'),
  ('D', 'R12', 'PP7'),

  -- Sensores para a PP8 (15 vagas)
  ('D', 'R1', 'PP8'),
  ('D', 'R2', 'PP8'),
  ('D', 'R3', 'PP8'),
  ('D', 'R4', 'PP8'),
  ('D', 'R5', 'PP8'),
  ('D', 'R6', 'PP8'),
  ('D', 'R7', 'PP8'),
  ('D', 'R8', 'PP8'),
  ('D', 'R9', 'PP8'),
  ('D', 'R10', 'PP8'),
  ('D', 'R11', 'PP8'),
  ('D', 'R12', 'PP8'),
  ('D', 'R13', 'PP8'),
  ('D', 'R14', 'PP8'),
  ('D', 'R15', 'PP8'),

  -- Sensores para a PP9 (9 vagas)
  ('D', 'R1', 'PP9'),
  ('D', 'R2', 'PP9'),
  ('D', 'R3', 'PP9'),
  ('D', 'R4', 'PP9'),
  ('D', 'R5', 'PP9'),
  ('D', 'R6', 'PP9'),
  ('D', 'R7', 'PP9'),
  ('D', 'R8', 'PP9'),
  ('D', 'R9', 'PP9'),

  -- Sensores para a PP10 (6 vagas)
  ('D', 'R1', 'PP10'),
  ('D', 'R2', 'PP10'),
  ('D', 'R3', 'PP10'),
  ('D', 'R4', 'PP10'),
  ('D', 'R5', 'PP10'),
  ('D', 'R6', 'PP10'),

  -- Sensores para a PP11 (4 vagas)
  ('D', 'R1', 'PP11'),
  ('D', 'R2', 'PP11'),
  ('D', 'R3', 'PP11'),
  ('D', 'R4', 'PP11'),

  -- Sensores para a PP12 (10 vagas)
  ('D', 'R1', 'PP12'),
  ('D', 'R2', 'PP12'),
  ('D', 'R3', 'PP12'),
  ('D', 'R4', 'PP12'),
  ('D', 'R5', 'PP12'),
  ('D', 'R6', 'PP12'),
  ('D', 'R7', 'PP12'),
  ('D', 'R8', 'PP12'),
  ('D', 'R9', 'PP12'),
  ('D', 'R10', 'PP12'),

  -- Sensores para a PP13 (8 vagas)
  ('D', 'R1', 'PP13'),
  ('D', 'R2', 'PP13'),
  ('D', 'R3', 'PP13'),
  ('D', 'R4', 'PP13'),
  ('D', 'R5', 'PP13'),
  ('D', 'R6', 'PP13'),
  ('D', 'R7', 'PP13'),
  ('D', 'R8', 'PP13'),

  -- Sensores para a PP14 (13 vagas)
  ('D', 'R1', 'PP14'),
  ('D', 'R2', 'PP14'),
  ('D', 'R3', 'PP14'),
  ('D', 'R4', 'PP14'),
  ('D', 'R5', 'PP14'),
  ('D', 'R6', 'PP14'),
  ('D', 'R7', 'PP14'),
  ('D', 'R8', 'PP14'),
  ('D', 'R9', 'PP14'),
  ('D', 'R10', 'PP14'),
  ('D', 'R11', 'PP14'),
  ('D', 'R12', 'PP14'),
  ('D', 'R13', 'PP14'),

  -- Sensores para a PP15 (5 vagas)
  ('D', 'R1', 'PP15'),
  ('D', 'R2', 'PP15'),
  ('D', 'R3', 'PP15'),
  ('D', 'R4', 'PP15'),
  ('D', 'R5', 'PP15'),

  -- Sensores para a PP16 (11 vagas)
  ('D', 'R1', 'PP16'),
  ('D', 'R2', 'PP16'),
  ('D', 'R3', 'PP16'),
  ('D', 'R4', 'PP16'),
  ('D', 'R5', 'PP16'),
  ('D', 'R6', 'PP16'),
  ('D', 'R7', 'PP16'),
  ('D', 'R8', 'PP16'),
  ('D', 'R9', 'PP16'),
  ('D', 'R10', 'PP16'),
  ('D', 'R11', 'PP16'),

  -- Sensores para a PP17 (7 vagas)
  ('D', 'R1', 'PP17'),
  ('D', 'R2', 'PP17'),
  ('D', 'R3', 'PP17'),
  ('D', 'R4', 'PP17'),
  ('D', 'R5', 'PP17'),
  ('D', 'R6', 'PP17'),
  ('D', 'R7', 'PP17'),

  -- Sensores para a PP18 (9 vagas)
  ('D', 'R1', 'PP18'),
  ('D', 'R2', 'PP18'),
  ('D', 'R3', 'PP18'),
  ('D', 'R4', 'PP18'),
  ('D', 'R5', 'PP18'),
  ('D', 'R6', 'PP18'),
  ('D', 'R7', 'PP18'),
  ('D', 'R8', 'PP18'),
  ('D', 'R9', 'PP18'),

  -- Sensores para a PP19 (14 vagas)
  ('D', 'R1', 'PP19'),
  ('D', 'R2', 'PP19'),
  ('D', 'R3', 'PP19'),
  ('D', 'R4', 'PP19'),
  ('D', 'R5', 'PP19'),
  ('D', 'R6', 'PP19'),
  ('D', 'R7', 'PP19'),
  ('D', 'R8', 'PP19'),
  ('D', 'R9', 'PP19'),
  ('D', 'R10', 'PP19'),
  ('D', 'R11', 'PP19'),
  ('D', 'R12', 'PP19'),
  ('D', 'R13', 'PP19'),
  ('D', 'R14', 'PP19'),

  -- Sensores para a PP20 (10 vagas)
  ('D', 'R1', 'PP20'),
  ('D', 'R2', 'PP20'),
  ('D', 'R3', 'PP20'),
  ('D', 'R4', 'PP20'),
  ('D', 'R5', 'PP20'),
  ('D', 'R6', 'PP20'),
  ('D', 'R7', 'PP20'),
  ('D', 'R8', 'PP20'),
  ('D', 'R9', 'PP20'),
  ('D', 'R10', 'PP20');

DELIMITER $$

CREATE PROCEDURE inserir_ocupacoes()
BEGIN
    -- Declaração de variáveis
    DECLARE id_inicio INT DEFAULT 37;
    DECLARE num_ocupacoes INT DEFAULT 10000;
    DECLARE sen_id_max INT DEFAULT 170;
    DECLARE tempo_min INT DEFAULT 300;
    DECLARE tempo_max INT DEFAULT 10800;
    DECLARE i INT DEFAULT 1;

    -- Variáveis auxiliares
    DECLARE ocp_id INT;
    DECLARE sen_id INT;
    DECLARE inicio DATETIME;
    DECLARE tempo INT;
    DECLARE fim DATETIME;

    -- Remover tabela temporária se já existir
    DROP TEMPORARY TABLE IF EXISTS ocupacoes_temp;

    -- Criar tabela temporária para as ocupações
    CREATE TEMPORARY TABLE ocupacoes_temp (
        ocp_id INT,
        ocp_dtInicio DATETIME,
        ocp_dtFim DATETIME,
        ocp_tempo INT,
        sen_id INT
    );

    -- Loop para gerar as ocupações
    WHILE i <= num_ocupacoes DO
        SET ocp_id = id_inicio + i;
        SET sen_id = ((i - 1) % sen_id_max) + 1;
        SET inicio = DATE_ADD('2024-11-10 08:00:00', INTERVAL i * 10 MINUTE);
        SET tempo = FLOOR(RAND() * (tempo_max - tempo_min + 1)) + tempo_min;
        SET fim = DATE_ADD(inicio, INTERVAL tempo SECOND);

        -- Inserir os dados na tabela temporária
        INSERT INTO ocupacoes_temp (ocp_id, ocp_dtInicio, ocp_dtFim, ocp_tempo, sen_id)
        VALUES (ocp_id, inicio, fim, tempo, sen_id);

        SET i = i + 1;
    END WHILE;

    -- Inserir os dados da tabela temporária na tabela final
    INSERT INTO ocupacao (ocp_id, ocp_dtInicio, ocp_dtFim, ocp_tempo, sen_id)
    SELECT * FROM ocupacoes_temp;

    -- Remover a tabela temporária
    DROP TEMPORARY TABLE ocupacoes_temp;
END$$

DELIMITER ;

-- Executar a procedure
CALL inserir_ocupacoes();