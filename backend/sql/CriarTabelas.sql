-- DROP SCHEMA smart_parking;
CREATE SCHEMA IF NOT EXISTS smart_parking DEFAULT CHARACTER SET utf8;
USE smart_parking;

CREATE TABLE IF NOT EXISTS rua (
  rua_id VARCHAR(50) NOT NULL,
  rua_nome VARCHAR(100) NOT NULL,
  rua_bairro VARCHAR(50) NOT NULL,
  rua_cidade VARCHAR(50) NOT NULL,
  rua_uf CHAR(2) NOT NULL,
  rua_qtdVagas INT NULL,
  CONSTRAINT pk_rua PRIMARY KEY (rua_id)
);
CREATE TABLE IF NOT EXISTS sensor (
  sen_id INT NOT NULL AUTO_INCREMENT,
  sen_estado ENUM("D", "A", "O", "M") NOT NULL,  -- 'D'=Disponivel, "A"=Analise, "O"=Ocupado, "M"=Manutencao
  sen_ladoPos CHAR(2) NOT NULL,
  rua_id VARCHAR(50) NOT NULL,
  CONSTRAINT pk_sensor PRIMARY KEY (sen_id),
  CONSTRAINT fk_sensor_rua
    FOREIGN KEY (rua_id) 
      REFERENCES rua (rua_id)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS ocupacao (
  ocp_id INT NOT NULL AUTO_INCREMENT,
  ocp_dtInicio DATETIME NOT NULL,
  ocp_dtFim DATETIME NULL,
  ocp_tempo INT NULL,
  sen_id INT NOT NULL,
  CONSTRAINT pk_ocupacao PRIMARY KEY (ocp_id, sen_id),
  CONSTRAINT fk_ocupacao_sensor
    FOREIGN KEY (sen_id) 
      REFERENCES sensor (sen_id)
        ON DELETE NO ACTION ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS usuario(
  usu_id INT NOT NULL AUTO_INCREMENT,
  usu_nick VARCHAR(45) NOT NULL,
  usu_nome VARCHAR(100) NOT NULL,
  usu_email VARCHAR(100) NOT NULL,
  usu_senha VARCHAR(100) NOT NULL,
  CONSTRAINT pk_usuario PRIMARY KEY (usu_id),
  CONSTRAINT uk_usuario UNIQUE (usu_email, usu_nome)
);