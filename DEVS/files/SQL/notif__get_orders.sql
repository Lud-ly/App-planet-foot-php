SELECT
  user.id_user,
  user.user_name,
  user.user_firstname,
  user.user_mail,
  user.user_gender,
  purchase.id_purchase,
  purchase.purchase_reference,
  purchase.purchase_date,
  purchase.purchase_status,
  purchase.purchase_reservationNotif_read,
  purchase.purchase_paymentNotif_read,
  purchase.purchase_withdrawal_read,
  basket.id_basket,
  basket.basket_name,
  basket.basket_description,
  basket.basket_image,
  basket_end_validation_date,
  basket_payment_end_date,
  basket_withdrawal_end_date
FROM
  purchase,
  user__basket,
  basket,
  user
WHERE purchase.id_purchase = user__basket.id_purchase
  AND basket.id_basket = user__basket.id_basket
  AND user.id_user = user__basket.id_user
  AND purchase.purchase_status = @purchaseStatus
  AND basket.@basketDate > NOW()
  AND TIMESTAMPDIFF(HOUR, NOW(), basket.@basketDate) <= @hoursBeforeEnd
  @condition
GROUP BY basket.id_basket
ORDER BY basket.@basketDate ASC;
  -- condition vaut '' OU 'AND user.id_user = @id_user'
