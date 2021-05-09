select basket.id_basket, mainbasket.id_mainBasket, basket.id_supplier, supplier_name, supplier_firstname, mainBasket_name, basket_quantity, basket_name, basket_image, mainBasket_image, basket_description, basket_price, basket_number, basket_status
from basket 
inner join supplier on basket.id_supplier= supplier.id_supplier
inner join mainbasket on basket.id_mainBasket= mainbasket.id_mainBasket 