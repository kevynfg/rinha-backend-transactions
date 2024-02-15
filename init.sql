CREATE TABLE clientes (
  id SERIAL NOT NULL UNIQUE,
  nome VARCHAR(100) NOT NULL,
  limite INTEGER NOT NULL
);

CREATE TABLE transacoes (
  id SERIAL NOT NULL UNIQUE,
  cliente_id INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  tipo CHAR(1) NOT NULL,
  descricao VARCHAR(100) NOT NULL,
  data TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_cliente_id FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE saldos (
  id SERIAL NOT NULL UNIQUE,
  cliente_id INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  CONSTRAINT fk_cliente_id FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE INDEX idx_cliente_id ON transacoes(cliente_id);

DO $$
BEGIN
	INSERT INTO clientes (nome, limite)
	VALUES
		('o barato sai caro', 1000 * 100),
		('zan corp ltda', 800 * 100),
		('les cruders', 10000 * 100),
		('padaria joia de cocaia', 100000 * 100),
		('kid mais', 5000 * 100);
	
	INSERT INTO saldos (cliente_id, valor)
		SELECT id, 0 FROM clientes;
END;
$$;


-- CREATE TABLE IF NOT EXISTS clientes (
--   id SERIAL PRIMARY KEY,
--   nome VARCHAR(100) NOT NULL,
--   limite INTEGER NOT NULL
-- );

-- DO $$
-- BEGIN
-- 	INSERT INTO clientes (id, nome, limite)
-- 	VALUES
-- 		(1, 'o barato sai caro', 1000 * 100),
-- 		(2, 'zan corp ltda', 800 * 100),
-- 		(3, 'les cruders', 10000 * 100),
-- 		(4, 'padaria joia de cocaia', 100000 * 100),
-- 		(5, 'kid mais', 5000 * 100);
		
-- 		INSERT INTO saldos (id, cliente_id, valor)
-- 		VALUES 
-- 			(1, 1, 0),
-- 			(2, 2, 0),
-- 			(3, 3, 0),
-- 			(4, 4, 0),
-- 			(5, 5, 0);
-- END;
-- $$;