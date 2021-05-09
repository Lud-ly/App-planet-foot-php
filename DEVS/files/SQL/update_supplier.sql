update supplier
 SET 
     supplier_name = "@supplier_name",
     supplier_firstname = "@supplier_firstname",
     supplier_img = "@supplier_img",
     supplier_mail = "@supplier_mail",
     supplier_phoneNumber = "@supplier_phoneNumber",
     supplier_address = "@supplier_address",
     supplier_zipCode = "@supplier_zipCode",
     supplier_city = "@supplier_city",
     supplier_storeName = "@supplier_storeName",
     supplier_urlGoogleMap = "@supplier_urlGoogleMap"
    WHERE id_supplier=@id_supplier