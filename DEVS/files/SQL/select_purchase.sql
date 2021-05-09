
select user__basket.id_purchase, basket.id_basket, basket.basket_image, basket_price, basket_description, purchase.purchase_reference, 
date_format(purchase.purchase_date,"%d %b %Y") as "purchase_date", purchase.purchase_status, basket.basket_name, basket.basket_reference,
ordered_quantity
from purchase
inner join user__basket on user__basket.id_purchase= purchase.id_purchase
inner join basket on basket.id_basket=user__basket.id_basket
where purchase.id_user = @id_user
order by purchase.purchase_date Desc;