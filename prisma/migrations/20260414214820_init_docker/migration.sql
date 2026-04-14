-- CreateTable
CREATE TABLE `citas` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `paciente_id` INTEGER UNSIGNED NOT NULL,
    `usuario_id` INTEGER UNSIGNED NOT NULL,
    `fecha_hora` DATETIME(0) NOT NULL,
    `duracion_min` SMALLINT NOT NULL DEFAULT 30,
    `motivo` VARCHAR(255) NULL,
    `estado` ENUM('Programada', 'Completada', 'Cancelada', 'No asistió') NOT NULL DEFAULT 'Programada',
    `notas` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_cita_paciente`(`paciente_id`),
    INDEX `idx_cita_fecha`(`fecha_hora`),
    INDEX `idx_cita_usuario`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospitales_origen` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(150) NOT NULL,
    `ciudad` VARCHAR(100) NULL,
    `estado` VARCHAR(100) NULL,
    `telefono` VARCHAR(20) NULL,

    UNIQUE INDEX `uq_hospital_nombre`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pacientes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `apellido_paterno` VARCHAR(100) NOT NULL,
    `apellido_materno` VARCHAR(100) NULL,
    `fecha_nacimiento` DATE NULL,
    `sexo` ENUM('M', 'F', 'Otro') NULL,
    `telefono_contacto` VARCHAR(20) NULL,
    `diagnostico` TEXT NOT NULL,
    `fecha_ingreso` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fecha_egreso` DATETIME(0) NULL,
    `estado` ENUM('Hospitalizado', 'Ambulatorio', 'Alta', 'Fallecido') NOT NULL DEFAULT 'Hospitalizado',
    `referido` BOOLEAN NOT NULL DEFAULT false,
    `hospital_origen_id` INTEGER UNSIGNED NULL,
    `medico_id` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_paciente_hospital_origen`(`hospital_origen_id`),
    INDEX `idx_paciente_estado`(`estado`),
    INDEX `idx_paciente_ingreso`(`fecha_ingreso`),
    INDEX `idx_paciente_medico`(`medico_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uq_rol_nombre`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `numero_empleado` VARCHAR(50) NOT NULL,
    `telefono` VARCHAR(20) NULL,
    `requiere_cambio_password` BOOLEAN NOT NULL DEFAULT true,
    `rol_id` INTEGER UNSIGNED NOT NULL,
    `turno` ENUM('Matutino', 'Vespertino', 'Nocturno', 'Mixto') NOT NULL DEFAULT 'Matutino',
    `hora_entrada` TIME(0) NULL,
    `hora_salida` TIME(0) NULL,
    `dias_laborales` VARCHAR(191) NOT NULL DEFAULT 'Lunes,Martes,Miércoles,Jueves,Viernes',
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `uq_email`(`email`),
    UNIQUE INDEX `usuarios_numero_empleado_key`(`numero_empleado`),
    INDEX `fk_usuario_rol`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `accion` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `usuario_id` INTEGER UNSIGNED NOT NULL,

    INDEX `idx_audit_usuario`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `citas` ADD CONSTRAINT `fk_cita_paciente` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `citas` ADD CONSTRAINT `fk_cita_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `fk_paciente_hospital_origen` FOREIGN KEY (`hospital_origen_id`) REFERENCES `hospitales_origen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pacientes` ADD CONSTRAINT `fk_paciente_medico` FOREIGN KEY (`medico_id`) REFERENCES `usuarios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `fk_audit_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
