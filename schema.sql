-- schema temporal y sujeto a cambios
-- MariaDB Hospital Schema
-- mariadb -u root -p < hospital_schema.sql

CREATE DATABASE IF NOT EXISTS Hospital
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE Hospital;

-- ============================================================
-- TABLA: roles
-- Catálogo de roles del personal hospitalario
-- ============================================================
CREATE TABLE IF NOT EXISTS roles (
  id          INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(100)   NOT NULL,
  descripcion VARCHAR(255)       NULL,
  created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_rol_nombre (nombre)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO roles (nombre, descripcion) VALUES
  ('Director General',               'Máxima autoridad administrativa y clínica del hospital'),
  ('Subdirector Administrativo',     'Gestión de recursos humanos, financieros y operativos'),
  ('Médico Especialista',            'Atención médica especializada a pacientes'),
  ('Personal de Enfermería',         'Cuidado directo y seguimiento de pacientes'),
  ('Responsable de Servicios Generales', 'Supervisión de limpieza, mantenimiento e infraestructura'),
  ('Personal de Apoyo Clínico',      'Laboratorio, radiología, farmacia y otros apoyos diagnósticos'),
  ('Trabajador Social',              'Gestión de casos sociales y coordinación con pacientes y familias'),
  ('Personal Operativo',             'Funciones de soporte general y administrativo');

-- ============================================================
-- TABLA: usuarios
-- Personal del hospital con su rol y horario asignado
-- ============================================================
CREATE TABLE IF NOT EXISTS usuarios (
  id              INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  nombre          VARCHAR(100)   NOT NULL,
  email           VARCHAR(150)   NOT NULL,
  password        VARCHAR(255)   NOT NULL,
  rol_id          INT UNSIGNED   NOT NULL,

  -- Horario de trabajo
  turno           ENUM('Matutino','Vespertino','Nocturno','Mixto') NOT NULL DEFAULT 'Matutino',
  hora_entrada    TIME               NULL,
  hora_salida     TIME               NULL,
  dias_laborales  SET('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo')
                                 NOT NULL DEFAULT 'Lunes,Martes,Miércoles,Jueves,Viernes',

  activo          TINYINT(1)     NOT NULL DEFAULT 1,
  created_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                                          ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_email (email),
  CONSTRAINT fk_usuario_rol
    FOREIGN KEY (rol_id) REFERENCES roles (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: hospitales_origen
-- Catálogo de hospitales para registrar referencias externas
-- ============================================================
CREATE TABLE IF NOT EXISTS hospitales_origen (
  id        INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  nombre    VARCHAR(150)   NOT NULL,
  ciudad    VARCHAR(100)       NULL,
  estado    VARCHAR(100)       NULL,
  telefono  VARCHAR(20)        NULL,

  PRIMARY KEY (id),
  UNIQUE KEY uq_hospital_nombre (nombre)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: pacientes
-- Registro de pacientes hospitalizados o en consulta
-- ============================================================
CREATE TABLE IF NOT EXISTS pacientes (
  id                  INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  nombre              VARCHAR(100)   NOT NULL,
  apellido_paterno    VARCHAR(100)   NOT NULL,
  apellido_materno    VARCHAR(100)       NULL,
  fecha_nacimiento    DATE               NULL,
  sexo                ENUM('M','F','Otro') NULL,
  telefono_contacto   VARCHAR(20)        NULL,

  -- Información clínica
  diagnostico         TEXT           NOT NULL,
  fecha_ingreso       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_egreso        DATETIME           NULL,
  estado              ENUM('Hospitalizado','Ambulatorio','Alta','Fallecido')
                                     NOT NULL DEFAULT 'Hospitalizado',

  -- Referencia externa (NULL si ingresó directamente)
  referido            TINYINT(1)     NOT NULL DEFAULT 0,
  hospital_origen_id  INT UNSIGNED       NULL,

  -- Médico responsable
  medico_id           INT UNSIGNED       NULL,

  created_at          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
                                              ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_paciente_hospital_origen
    FOREIGN KEY (hospital_origen_id) REFERENCES hospitales_origen (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  CONSTRAINT fk_paciente_medico
    FOREIGN KEY (medico_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,

  -- Si referido=0 entonces hospital_origen_id debe ser NULL (validación a nivel app)
  INDEX idx_paciente_estado   (estado),
  INDEX idx_paciente_ingreso  (fecha_ingreso),
  INDEX idx_paciente_medico   (medico_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: citas
-- Agenda y seguimiento de consultas / revisiones
-- ============================================================
CREATE TABLE IF NOT EXISTS citas (
  id            INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  paciente_id   INT UNSIGNED   NOT NULL,
  usuario_id    INT UNSIGNED   NOT NULL,   -- médico o enfermero asignado
  fecha_hora    DATETIME       NOT NULL,
  duracion_min  SMALLINT       NOT NULL DEFAULT 30,
  motivo        VARCHAR(255)       NULL,
  estado        ENUM('Programada','Completada','Cancelada','No asistió')
                               NOT NULL DEFAULT 'Programada',
  notas         TEXT               NULL,
  created_at    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_cita_paciente
    FOREIGN KEY (paciente_id) REFERENCES pacientes (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_cita_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
  INDEX idx_cita_fecha (fecha_hora),
  INDEX idx_cita_usuario (usuario_id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
