SELECT
	parameter_name AS paramName,
	parameter_value AS paramValue,
	parameter_status AS paramStatus
FROM `parameter`
WHERE `id_center` = '@centerId';