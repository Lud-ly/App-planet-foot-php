select count(id_purchase) as "Commandes_annulées", user.id_user as "userId" 
from user 
inner join purchase on user.id_user = purchase.id_user
where purchase.purchase_status=6 
group by user.id_user;