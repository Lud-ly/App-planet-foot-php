SELECT `id_parameter` AS paramId
FROM `parameter`
WHERE `id_center` = '@centerId'
AND `parameter_name` = '@paramName';