select mainBasket_name, basket.id_mainBasket, basket.id_basket, basket_name, basket_number, basket_description, basket_image, basket_price, DATE_FORMAT(basket.basket_begin_date, GET_FORMAT(DATE, 'EUR')) as "date_de_debut", 
DATE_FORMAT(basket.basket_end_date, GET_FORMAT(DATE, 'EUR')) as "date_de_fin", mainbasket.mainBasket_image, mainbasket.mainBasket_description, supplier_firstname, supplier_name, 
supplier_storeName,supplier_address, supplier_complement_address, supplier_mail, supplier_phoneNumber, supplier_img
from basket 
inner join supplier on supplier.id_supplier= basket.id_supplier
inner join mainbasket on mainbasket.id_mainBasket = basket.id_mainBasket
order by basket.basket_price Asc;