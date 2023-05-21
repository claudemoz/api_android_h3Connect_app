 SELECT `asso_actor_date`.`id_asso_actor_date`, `asso_actor_date`.`id_date`, `date`.`id_date` 
 AS `date.id_date`, `date->asso_date_times`.`id_asso_date_time` 
 AS `date.asso_date_times.id_asso_date_time`, `date->asso_date_times`.`id_date`
 AS `date.asso_date_times.id_date`, `date->asso_date_times`.`id_time` 
 AS `date.asso_date_times.id_time`, `date->asso_date_times->time`.`id_time` 
 AS `date.asso_date_times.time.id_time`, `date->asso_date_times->time`.`time` 
 AS `date.asso_date_times.time.time` 
 FROM `asso_actor_date` 
 AS `asso_actor_date` 
 INNER JOIN `date` 
 AS `date` 
 ON `asso_actor_date`.`id_date` = `date`.`id_date` 
 INNER JOIN `asso_date_time` 
 AS `date->asso_date_times` 
 ON `date`.`id_date` = `date->asso_date_times`.`id_date` 
 INNER JOIN `time` 
 AS `date->asso_date_times->time` 
 ON `date->asso_date_times`.`id_time` = `date->asso_date_times->time`.`id_time` 
 WHERE `asso_actor_date`.`id_actor` = '1';