SELECT DISTINCT
	promo.id_promo AS promoId,
	promo.promo_label AS promoLabel,
	promo.promo_reference AS promoReference,
	promo.promo_number AS promoNumber,
	promo.promo_type AS promoType,
	promo.promo_begin_date AS promoBeginDate,
	promo.promo_end_date AS promoEndDate,
	promo.promo_quantity AS promoQuantity,
	promo.promo_status AS promoStatus
FROM `promo`
LEFT JOIN user__promo
 ON user__promo.id_promo = promo.id_promo
WHERE
	`promo_reference` LIKE '@promoCode'
 AND
	`promo_status` = 1
 AND
	`promo_begin_date` <= NOW()
 AND
	(`promo_end_date` >= NOW() OR `promo_end_date` IS NULL)
 AND
	(`promo_quantity` > (
		SELECT
		COUNT(*)
		FROM user__promo
		WHERE (user__promo.`id_promo` = id_promo AND user__promo.id_purchase IS NULL)
	)
  OR
	(`promo_quantity` IS NULL))
;