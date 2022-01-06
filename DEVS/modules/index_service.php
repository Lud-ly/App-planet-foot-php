<?php
require_once  "initialize.php";
/**
 * Class index_service | fichier index_service.php
 *
 * Description de la classe à renseigner.
 *
 * Cette classe necessite l'utilisation de la classe :
 *
 * require_once "initialize.php";
 *
 * @package Planet-foot Project
 * @subpackage index_service
 * @author @LudoLabTeam - Ludo
 * @copyright  1920-2080 
 * @version v1.0
 */

class Index_service extends Initialize
{

  /**
   * public $resultat is used to store all datas needed for HTML Templates
   * @var array
   */
  public $resultat;

  /**
   * init variables resultat
   *
   * execute main function
   */
  public function __construct()
  {
    // Call Parent Constructor
    parent::__construct();

    // init variables resultat
    $this->resultat = [];

    // execute main function

  }

  /**
   *
   * Destroy service
   *
   */
  public function __destruct()
  {
    // Call Parent destructor
    parent::__destruct();
  }
}


// $curl = curl_init();

// curl_setopt_array($curl, [
// 	CURLOPT_URL => "https://free-football-soccer-videos.p.rapidapi.com/",
// 	CURLOPT_RETURNTRANSFER => true,
// 	CURLOPT_FOLLOWLOCATION => true,
// 	CURLOPT_ENCODING => "",
// 	CURLOPT_MAXREDIRS => 10,
// 	CURLOPT_TIMEOUT => 30,
// 	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
// 	CURLOPT_CUSTOMREQUEST => "GET",
// 	CURLOPT_HTTPHEADER => [
// 		"x-rapidapi-host: free-football-soccer-videos.p.rapidapi.com",
// 		"x-rapidapi-key: 39ac6c85ebmsh6b6e308a4061cbfp1b0061jsn5e48f2a2f866"
// 	],
// ]);

// $response = curl_exec($curl);
// $err = curl_error($curl);

// curl_close($curl);

// if ($err) {
// 	echo "cURL Error #:" . $err;
// } else {
// 	echo $response;
// }
