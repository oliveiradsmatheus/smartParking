DELETE FROM ocupacao;
DELETE FROM sensor;
DELETE FROM rua;

-- Inserir uma rua
INSERT INTO `rua` (`rua_id`, `rua_nome`, `rua_bairro`, `rua_cidade`,`rua_uf`, `rua_qtdVagas`)
VALUES
  ('RUA1', 'Rua Bom Jesus', 'Jardim Brasília', 'Presidente Prudente', 'SP', 3),
  ('RUA2', 'Rua Brigadeiro Tobias', 'Jardim Brasília', 'Presidente Prudente', 'SP', 3);

-- Inserir três sensores para a rua cadastrada
INSERT INTO `sensor` (`sen_estado`, `sen_ladoPos`,`rua_id`)
VALUES
  ('D', 'R1', 'RUA1'),  -- Sensor 1 disponível
  ('O', 'R2', 'RUA1'),  -- Sensor 2 disponível
  ('M', 'L1', 'RUA1');  -- Sensor 3 disponível
  -- ('D', 'R1', 'RUA2'),  -- Sensor 1 disponível
  -- ('A', 'L1', 'RUA2'),  -- Sensor 2 disponível
  -- ('O', 'L2', 'RUA2');  -- Sensor 3 disponível

-- Inserir várias ocupações para o sensor 1
-- INSERT INTO `ocupacao` (`ocp_dtInicio`, `ocp_dtFim`, `ocp_tempo`, `sen_id`)
-- VALUES
--   ('2024-10-01 08:00:00', '2024-10-01 09:30:00', 90, 1), -- 1ª Ocupação
--   ('2024-10-01 10:00:00', '2024-10-01 11:00:00', 60, 1), -- 2ª Ocupação
--   ('2024-10-02 14:00:00', '2024-10-02 15:30:00', 90, 1), -- 3ª Ocupação
--   ('2024-10-03 12:00:00', '2024-10-03 13:00:00', 60, 1), -- 4ª Ocupação
--   ('2024-10-04 09:00:00', '2024-10-04 10:30:00', 90, 1), -- 5ª Ocupação
--   ('2024-10-05 18:00:00', '2024-10-05 19:00:00', 60, 1); -- 6ª Ocupação

-- -- Inserir várias ocupações para o sensor 2
-- INSERT INTO `ocupacao` (`ocp_dtInicio`, `ocp_dtFim`, `ocp_tempo`, `sen_id`)
-- VALUES
--   ('2024-10-01 09:30:00', '2024-10-01 11:00:00', 90, 2), -- 1ª Ocupação
--   ('2024-10-02 16:00:00', '2024-10-02 17:00:00', 60, 2), -- 2ª Ocupação
--   ('2024-10-03 14:00:00', '2024-10-03 15:30:00', 90, 2), -- 3ª Ocupação
--   ('2024-10-04 11:00:00', '2024-10-04 12:00:00', 60, 2), -- 4ª Ocupação
--   ('2024-10-05 10:00:00', '2024-10-05 11:30:00', 90, 2), -- 5ª Ocupação
--   ('2024-10-06 15:00:00', '2024-10-06 16:00:00', 60, 2); -- 6ª Ocupação

-- -- Inserir várias ocupações para o sensor 3
-- INSERT INTO `ocupacao` (`ocp_dtInicio`, `ocp_dtFim`, `ocp_tempo`, `sen_id`)
-- VALUES
--   ('2024-10-01 07:00:00', '2024-10-01 09:00:00', 120, 3), -- 1ª Ocupação
--   ('2024-10-03 08:30:00', '2024-10-03 10:00:00', 90, 3), -- 2ª Ocupação
--   ('2024-10-04 13:00:00', '2024-10-04 14:30:00', 90, 3), -- 3ª Ocupação
--   ('2024-10-05 12:00:00', '2024-10-05 13:30:00', 90, 3), -- 4ª Ocupação
--   ('2024-10-06 11:00:00', '2024-10-06 12:00:00', 60, 3), -- 5ª Ocupação
--   ('2024-10-07 16:00:00', '2024-10-07 17:00:00', 60, 3); -- 6ª Ocupação

-- -- Inserir ocupações adicionais para o sensor 1
-- INSERT INTO `ocupacao` (`ocp_dtInicio`, `ocp_dtFim`, `ocp_tempo`, `sen_id`)
-- VALUES
--   ('2024-10-08 06:00:00', '2024-10-08 07:30:00', 90, 4), -- Ocupação 1
--   ('2024-10-09 11:30:00', '2024-10-09 12:30:00', 60, 4), -- Ocupação 2
--   ('2024-10-10 17:00:00', '2024-10-10 18:00:00', 60, 4), -- Ocupação 3
--   ('2024-10-11 13:30:00', '2024-10-11 14:30:00', 60, 4), -- Ocupação 4
--   ('2024-10-12 19:00:00', '2024-10-12 20:30:00', 90, 4), -- Ocupação 5
--   ('2024-10-13 05:30:00', '2024-10-13 06:30:00', 60, 4); -- Ocupação 6

-- -- Inserir ocupações adicionais para o sensor 2
-- INSERT INTO `ocupacao` (`ocp_dtInicio`, `ocp_dtFim`, `ocp_tempo`, `sen_id`)
-- VALUES
--   ('2024-10-08 15:00:00', '2024-10-08 16:30:00', 90, 5), -- Ocupação 1
--   ('2024-10-09 07:00:00', '2024-10-09 08:00:00', 60, 5), -- Ocupação 2
--   ('2024-10-10 12:30:00', '2024-10-10 13:30:00', 60, 5), -- Ocupação 3
--   ('2024-10-11 16:00:00', '2024-10-11 17:30:00', 90, 5), -- Ocupação 4
--   ('2024-10-12 08:30:00', '2024-10-12 10:00:00', 90, 5), -- Ocupação 5
--   ('2024-10-13 18:00:00', '2024-10-13 19:30:00', 90, 5); -- Ocupação 6

-- -- Inserir ocupações adicionais para o sensor 3
-- INSERT INTO `ocupacao` (`ocp_dtInicio`, `ocp_dtFim`, `ocp_tempo`, `sen_id`)
-- VALUES
--   ('2024-10-08 04:00:00', '2024-10-08 05:00:00', 60, 6), -- Ocupação 1
--   ('2024-10-09 14:00:00', '2024-10-09 15:00:00', 60, 6), -- Ocupação 2
--   ('2024-10-10 09:00:00', '2024-10-10 10:30:00', 90, 6), -- Ocupação 3
--   ('2024-10-11 20:00:00', '2024-10-11 21:30:00', 90, 6), -- Ocupação 4
--   ('2024-10-12 13:00:00', '2024-10-12 14:00:00', 60, 6), -- Ocupação 5
--   ('2024-10-13 07:30:00', '2024-10-13 08:30:00', 60, 6); -- Ocupação 6
