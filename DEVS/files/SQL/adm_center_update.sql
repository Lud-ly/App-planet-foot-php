update center
 SET 
     center_contact_form_message = "@center_contact_form_message",
     center_validate_schedule = "@center_validate_schedule",
     center_phoneNumber = "@center_phoneNumber",
     withdrawall_date_available = "@withdrawall_date_available",
     center_place_topay = "@center_place_topay",
     center_withdrawall_schedule = "@center_withdrawall_schedule",
     center_contact_mail = "@center_contact_mail",
     center_urlGoogleMap = "@center_urlGoogleMap"
    WHERE id_center=@id_center