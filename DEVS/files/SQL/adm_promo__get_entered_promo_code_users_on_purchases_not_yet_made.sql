SELECT
	user.user_name AS userName,
    user.user_firstname AS userFirstName,
    center.center_name AS centerName
FROM
	user
INNER JOIN
	user__promo
 ON
 	user__promo.id_user = user.id_user
INNER JOIN
	center
 ON
 	center.id_center = user.id_center
WHERE
	(`used_promo` = 0 AND `id_purchase` IS NULL)
 AND
	`id_promo` = @promoId;