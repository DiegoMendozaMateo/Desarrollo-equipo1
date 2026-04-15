-- ============================================================
--  Hospital — Schema completo y corregido
--  mariadb -u root -p < hospital_schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS Hospital
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE Hospital;

-- ------------------------------------------------------------
--  Roles
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS roles (
  id     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50)  NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_nombre (nombre)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
  id                INT SIGNED NOT NULL,
  nombre            VARCHAR(255) NOT NULL,
  telefono          VARCHAR(20)   NOT NULL,
  email             VARCHAR(255) NOT NULL,
  password_hash     VARCHAR(255) NOT NULL,
  rol_id            INT UNSIGNED NOT NULL,
  datos_adicionales JSON         NULL,
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_telefono (telefono),
  UNIQUE KEY unique_email    (email),
  UNIQUE KEY unique_id       (id),
  CONSTRAINT fk_usuario_rol
    FOREIGN KEY (rol_id) REFERENCES roles (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Horarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS horarios (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id  INT SIGNED NOT NULL,
  lunes_entrada    TIME         NULL,   -- NULL = no trabaja ese día
  lunes_salida     TIME         NULL,
  martes_entrada   TIME         NULL,
  martes_salida    TIME         NULL,
  miercoles_entrada TIME        NULL,
  miercoles_salida  TIME        NULL,
  jueves_entrada   TIME         NULL,
  jueves_salida    TIME         NULL,
  viernes_entrada  TIME         NULL,
  viernes_salida   TIME         NULL,
  sabado_entrada   TIME         NULL,
  sabado_salida    TIME         NULL,
  domingo_entrada  TIME         NULL,
  domingo_salida   TIME         NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_horario_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Áreas del hospital
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS areas (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100) NOT NULL,
  tipo_area   ENUM('Administrativa','Medica') NOT NULL,
  descripcion TEXT         NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_nombre (nombre)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Pacientes
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS pacientes (
  id                     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre                 VARCHAR(255) NOT NULL,
  edad                   INT          NOT NULL,
  genero                 ENUM('Masculino','Femenino','Otro') NOT NULL,
  direccion              VARCHAR(255) NOT NULL,
  telefono               VARCHAR(20)   NOT NULL,
  nombre_representante   VARCHAR(255) NULL,
  telefono_representante INT SIGNED   NULL,
  created_at             TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_telefono (telefono)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Datos clínicos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS datos_clinicos (
  id                   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  paciente_id          INT UNSIGNED NOT NULL,
  usuario_id           INT SIGNED NOT NULL,
  fecha_hora           DATETIME     NOT NULL,
  sintomas             TEXT         NOT NULL,
  presion_arterial     DECIMAL(5,2) NOT NULL,   -- mmHg
  temperatura          DECIMAL(4,1) NOT NULL,   -- °C
  saturacion_oxigeno   DECIMAL(4,1) NOT NULL,   -- %
  estatura             DECIMAL(5,1) NOT NULL,   -- cm
  peso                 DECIMAL(5,2) NOT NULL,   -- kg
  antecedentes_medicos TEXT         NULL,
  created_at           TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_datos_clinicos_paciente
    FOREIGN KEY (paciente_id) REFERENCES pacientes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_datos_clinicos_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Diagnóstico
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS diagnostico (
  id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
  datos_clinicos_id INT UNSIGNED NOT NULL,
  diagnostico       TEXT         NOT NULL,
  tratamiento       TEXT         NOT NULL,   -- medicamentos, dosis y tiempos
  created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_diagnostico_datos_clinicos
    FOREIGN KEY (datos_clinicos_id) REFERENCES datos_clinicos (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Intervención médica
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS intervencion_medica (
  id                 INT UNSIGNED NOT NULL AUTO_INCREMENT,
  paciente_id        INT UNSIGNED NOT NULL,
  usuario_id         INT SIGNED NOT NULL,
  datos_clinicos_id  INT UNSIGNED NULL,
  tipo_intervencion  VARCHAR(150) NOT NULL,
  fecha_hora         DATETIME     NOT NULL,
  sala_asignada      VARCHAR(50)  NOT NULL,
  personal_requerido TEXT         NULL,
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_intervencion_paciente
    FOREIGN KEY (paciente_id) REFERENCES pacientes (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_intervencion_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  CONSTRAINT fk_intervencion_datos_clinicos
    FOREIGN KEY (datos_clinicos_id) REFERENCES datos_clinicos (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  INDEX idx_paciente (paciente_id),
  INDEX idx_fecha    (fecha_hora),
  INDEX idx_sala     (sala_asignada)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Logs de auditoría
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS logs (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_id INT SIGNED NOT NULL,
  accion     VARCHAR(255) NOT NULL,
  created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_log_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  INDEX idx_log_usuario (usuario_id),
  INDEX idx_log_fecha   (created_at)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
--  Insers iniciales
-- ------------------------------------------------------------ 
INSERT IGNORE INTO roles (nombre) VALUES
  ('Director General'),
  ('Subdirector Administrativo'),
  ('Médico Especialista'),
  ('Personal de Enfermería'),
  ('Responsable de Servicios Generales'),
  ('Personal de Apoyo Clínico'),
  ('Trabajador Social'),
  ('Personal Operativo');