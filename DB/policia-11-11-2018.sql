-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-11-2018 a las 20:01:44
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `policia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bien`
--

CREATE TABLE `bien` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `fk_direccion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `bien`
--

INSERT INTO `bien` (`id`, `nombre`, `fk_direccion`) VALUES
(2, 'Escritorio', 16),
(3, 'Computadora', 12),
(4, 'Nevera Ejecutiva', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `id_b` int(11) NOT NULL,
  `realizado` varchar(11) NOT NULL,
  `accion` varchar(50) NOT NULL,
  `afectado` varchar(20) NOT NULL,
  `fecha` varchar(20) NOT NULL,
  `hora` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`id`, `nombre`) VALUES
(12, 'Tecnología'),
(13, 'Cultura'),
(14, 'Catastro Municipal'),
(15, 'Desarrollo Económico'),
(16, 'Despacho del Alcalde');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionario`
--

CREATE TABLE `funcionario` (
  `nombres` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  `cedula` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_nacimiento` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_ingreso` varchar(12) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_egreso` varchar(12) COLLATE utf8_spanish_ci DEFAULT NULL,
  `fk_tipo_fun` int(11) NOT NULL,
  `fk_grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `funcionario`
--

INSERT INTO `funcionario` (`nombres`, `apellidos`, `cedula`, `fecha_nacimiento`, `fecha_ingreso`, `fecha_egreso`, `fk_tipo_fun`, `fk_grupo`) VALUES
('alexander', 'castro manzanares', '20300989', '2018-11-07', '2018-11-15', '', 3, 21),
('ramon jose', 'molina perez', '87654321', '2017-07-31', '2018-07-29', '', 4, 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`id`, `nombre`) VALUES
(21, 'Planificación de los paraguas coloridos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `guardia`
--

CREATE TABLE `guardia` (
  `id` int(11) NOT NULL,
  `hora_entrada` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `hora_salida` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `grupo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `guardia`
--

INSERT INTO `guardia` (`id`, `hora_entrada`, `hora_salida`, `nombre`, `grupo`) VALUES
(1, '6:00am', '6:00pm', 'TURNO DIURNO', 1),
(2, '6:00pm', '6:00pm', 'TURNO NOCTURNO', 2),
(3, '7:00am', '12:pm', 'TURNO MEDIO DIA', 3),
(4, '12:00pm', '7:00pm', 'TURNO MEDIA TARDE', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `nombre` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `presupuesto` varchar(6) COLLATE utf8_spanish_ci NOT NULL,
  `codigo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_fun`
--

CREATE TABLE `tipo_fun` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `sueldo` varchar(6) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipo_fun`
--

INSERT INTO `tipo_fun` (`id`, `nombre`, `sueldo`) VALUES
(1, 'Obrero', '1800'),
(2, 'contratado', '1800'),
(3, 'Coordinador', '3500'),
(4, 'Director', '30000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `nombres` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(90) COLLATE utf8_spanish_ci NOT NULL,
  `cedula` varchar(8) COLLATE utf8_spanish_ci NOT NULL,
  `pw` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `rol` varchar(1) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`nombres`, `apellidos`, `cedula`, `pw`, `rol`) VALUES
('Gabriel Jesus', 'Medina Morillo', '25237818', '$2y$10$O9LviqCojil5kegr/yquZuPwoh/pDYShMVMHVEvyQ2GyblT2p9wwm', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bien`
--
ALTER TABLE `bien`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`id_b`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `guardia`
--
ALTER TABLE `guardia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `tipo_fun`
--
ALTER TABLE `tipo_fun`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cedula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bien`
--
ALTER TABLE `bien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `id_b` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `guardia`
--
ALTER TABLE `guardia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tipo_fun`
--
ALTER TABLE `tipo_fun`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
