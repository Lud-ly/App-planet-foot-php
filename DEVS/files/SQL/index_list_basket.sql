SELECT DISTINCT mainbasket.id_mainBasket, basket.id_basket, mainbasket.mainBasket_name, mainBasket_image, mainbasket.mainBasket_description,
supplier.id_supplier, supplier.supplier_name, supplier.supplier_firstname, supplier.supplier_img, supplier.supplier_address, supplier.supplier_zipCode, supplier.supplier_city, supplier.supplier_storeName, supplier.supplier_urlGoogleMap, supplier.supplier_status
FROM mainbasket
INNER JOIN basket ON basket.id_mainBasket = mainbasket.id_mainBasket
INNER JOIN supplier ON basket.id_supplier= supplier.id_supplier
where mainbasket.mainBasket_status=1
order by mainbasket.id_mainBasket
