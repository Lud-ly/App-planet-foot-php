select count(id_purchase) as "Commandes_passées", user.id_user as "userId" 
from user 
inner join purchase on user.id_user = purchase.id_user 
group by user.id_user;