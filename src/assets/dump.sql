-- TABLA EXPEDIENTE
CREATE TABLE IF NOT EXISTS expediente(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exp TEXT, 
    exp_name TEXT
);
-- TABLA DE IMAGENES
CREATE TABLE IF NOT EXISTS imagenes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imagen_base64 TEXT, 
    exp INTEGER,
    FOREING KEY (exp) REFERENCES expediente(id)
);
-- Example (Depuración)
INSERT or IGNORE INTO expediente(exp, exp_name) VALUES ('EXP-0001', 'Expediente 0001');
INSERT or IGNORE INTO expediente(exp, exp_name) VALUES ('EXP-0002', 'Expediente 0002');
INSERT or IGNORE INTO expediente(exp, exp_name) VALUES ('EXP-0003', 'Expediente 0003');
INSERT or IGNORE INTO expediente(exp, exp_name) VALUES ('EXP-0004', 'Expediente 0004');
INSERT or IGNORE INTO expediente(exp, exp_name) VALUES ('EXP-0005', 'Expediente 0005');