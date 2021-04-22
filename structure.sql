CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `firstname` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;