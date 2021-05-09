$(document).ready(function(){
    listNotifAjax()
});

// let notif_dl_cmd_obj = [];

// if(session) {
//     stringOrder = JSON.parse(localStorage.getItem("order"));
//     stringOrder[stringOrder.length-1];
//     notif_dl_cmd_obj = stringOrder[0];
//     console.log(notif_dl_cmd_obj);
// } else {
//     window.location.href = "home";
// }


function constructNotif(){
    console.log("coucou");
    var template = `
    <tbody>
            <tr>
                <td style="padding:40px 0;">

                    <!-- Principal Block -->

                    <table cellpadding="0" cellspacing="0" width="608" border="0" align="center">
                        <tbody>
                            <tr>
                                <td>
                                    <a href="home"
                                        style="display:block; width:407px; height:100px; margin:0 auto 30px;">
                                        <img src="assets/img/logo_mail.png" alt="Logo Afpanier"
                                            style="display:block; border:0; margin:0;">
                                    </a>
                                    <p
                                        style="margin:0 0 36px; text-align:center; font-size:14px; line-height:20px; text-transform:uppercase; color:#626658;">
                                        Merci d'avoir commandé sur l'Af'panier.fr
                                    </p>
                                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                        <tbody>
                                            <td colspan="3" rowspan="3" bgcolor="#FFFFFF" style="padding:0 0 55px;">

                                                <!-- Informations -->

                                                <img src="assets/img/header_2.png" width="620" height="400"
                                                    alt="summer‘s coming trimm your sheeps"
                                                    style="display:block; border:0; margin:0 0 44px; background:#eeeeee;">
                                                <p
                                                    style="margin:0 30px 33px;; text-align:center; text-transform:uppercase;  font-size:24px; line-height:30px; font-weight:bold; color:#484a42;">
                                                    Votre commande est prête !
                                                </p>

                                                <hr width="75%" color="#DEDEDE">

                                                <p
                                                    id="notif_refcmd"
                                                    style="margin:0 30px 0px;; text-align:left; font-size:14px; line-height:30px; font-weight:regular; color:#5f615b;">
                                                    
                                                </p>

                                                <p
                                                    style="margin:0 30px 33px;; text-align:left; font-size:12px; line-height:30px; font-weight:thin; color:#5f615b;">
                                                    <a id="notif_datecmd" style="font-size: 20px;" >🛒</a> Venez chercher votre panier du <strong>20/11/2019</strong> au <strong>27/11/2019</strong>
                                                </p>

                                                <div class="button_cont" align="center">
                                                    <a class="button" href="order">
                                                        Voir mes commandes
                                                    </a>
                                                </div>


                                                <h1
                                                    style="margin:0 78px 0px; text-align:left; font-family: 'Montserrat', sans-serif;  font-size:16px; line-height:30px; font-weight:bold; color:#484a42;">
                                                    Récapitulatif de votre achat :
                                                </h1>

                                                <div class="chart">
                                                    <hr width="75%" color="#DEDEDE">

                                                        <div style="width: 100%; margin-left: 10%;" id="notif_carts">
                                                            <img style="width:23%;" src="assets/img/panier.png" alt="Image du panier de votre commande"> 
                                                            <span style="font-family: 'Montserrat', sans-serif;  font-size:13px; font-weight:thin; color:#484a42;" >
                                                                Panier de Légumes
                                                            </span>
                                                            <span style="margin-left: 15%; font-family: 'Montserrat', sans-serif;  font-size:13px; font-weight:thin; color:#484a42;" >
                                                                x1
                                                            </span>
                                                            <span style="margin: 8%; font-family: 'Montserrat', sans-serif;  font-size:13px; line-height:30px; font-weight:thin; color:#484a42;" >
                                                                27.95 €
                                                            </span>                                                        
                                                        </div>
                                                                    
                                                    <hr width="75%" color="#DEDEDE">
                                                </div>

                                            <th style="padding: 11px 0"></th>
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%" style="min-width:100%" role="presentation">

                                                

                                                <tbody>
                                                    
                                                    <tr  style="margin: 0 10% 0 10%;">

                                                  <th style="font-family:'Montserrat', sans-serif;font-size:13px;line-height:22px;font-weight:300;color:#666666;width:100%;padding:5px 0" align="left" bgcolor="#ffffff" valign="top">

                                                    <span>Réduction</span> ()</th>

                                                    <th style="font-family:'Montserrat', sans-serif;font-size:13px;line-height:22px;font-weight:300;color:#666666;width:100%;padding:5px 0" align="right" bgcolor="#ffffff" valign="top">-€7.49</th>

                                                  </tr>

                                                

                                                <tr style="margin: 0 10% 0 10%;">

                                                  <th style="font-family:'Montserrat', sans-serif;font-size:13px;line-height:22px;font-weight:300;color:#666666;width:100%;padding:5px 0" align="left" bgcolor="#ffffff" valign="top">Sous-Total</th>

                                                  <th style="font-family:'Montserrat', sans-serif;font-size:13px;line-height:22px;font-weight:300;color:#666666;width:100%;padding:5px 0" align="right" bgcolor="#ffffff" valign="top">€42.46</th>

                                                </tr>


                                                
                                                  <tr  style="margin: 0 10% 0 10%;">

                                                    <th style="font-family:'Montserrat', sans-serif;font-size:13px;line-height:22px;font-weight:300;color:#666666;width:100%;padding:5px 0" align="left" bgcolor="#ffffff" valign="top">T.V.A</th>

                                                    <th style="font-family:'Montserrat', sans-serif;font-size:13px;line-height:22px;font-weight:300;color:#666666;width:100%;padding:5px 0" align="right" bgcolor="#ffffff" valign="top">

                                                      €7.91</th>

                                                  </tr>

                                                <tr  style="margin: 0 10% 0 10%;">

                                                  <th style="font-family:'Montserrat', font-style='uppercase' sans-serif;font-size:13px;line-height:22px;font-weight:400;color:#1a1a1a;width:100%;text-transform:none;padding:5px 0" align="left" bgcolor="#ffffff" valign="top">Total</th>

                                                  <th style="font-family:'Montserrat', font-style='uppercase' sans-serif;font-size:13px;line-height:22px;font-weight:400;color:#1a1a1a;width:100%;text-transform:none;padding:5px 0" align="right" bgcolor="#ffffff" valign="top">€47.45</th>

                                                </tr>
                                            

                                              </tbody></table>
                                            

                                                <div style="text-align: center; padding-top: 8%; padding-right: 5%; color:#999999;">
                                                    <a href="">BOUTIQUE</a>
                                                        <span style="border-left: 2px solid; display: inline-block; height: 13px; margin: 0 20px;"></span>
                                                    <a href="">FACEBOOK</a>
                                                        <span style="border-left: 2px solid; display: inline-block; height: 13px; margin: 0 20px;"></span>
                                                    <a href="">SAV</a>                                                  
                                                </div>
                                    </table>
                                    <p
                                        style="margin:0; padding:34px 0 0; text-align:center; font-size:11px; line-height:13px; color:#333333;">
                                        Vous voulez plus de renseignement sur votre commande ? Vous pouvez cliquer
                                        <a href="order"
                                            style="color:#333333; text-decoration:underline;"><strong>ici</strong>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    `;
    document.getElementById("notif_table").innerHTML=template;
}
