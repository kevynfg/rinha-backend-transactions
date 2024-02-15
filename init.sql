CREATE TABLE clientes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  limite INTEGER NOT NULL
);

CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  valor INTEGER NOT NULL,
  tipo CHAR(1) NOT NULL,
  descricao VARCHAR(100) NOT NULL,
  data TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_cliente_id FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

CREATE TABLE saldos (
  id SERIAL PRIMARY KEY,
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