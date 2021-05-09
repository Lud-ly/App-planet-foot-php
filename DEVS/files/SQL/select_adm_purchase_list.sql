select distinct purchase.id_purchase, basket_price, basket.id_basket, purchase.id_user, purchase_reference, purchase_date, user_name, user_firstname, basket_name, ordered_quantity, purchase_status 
from user 
inner join purchase on user.id_user = purchase.id_user 
inner join user__basket on purchase.id_purchase = user__basket.id_purchase 
inner join basket on basket.id_basket= user__basket.id_basket
order by purchase.purchase_date