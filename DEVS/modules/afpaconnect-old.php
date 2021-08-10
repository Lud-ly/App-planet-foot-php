<?php

/**
 *  Used to log in the afpa user and to recover afpa users information.
 */
abstract class AfpaConnect {

	/**
	 * @static
	 * @var string|null $publicKey The public key which is used to recover afpa users information
	 */
	private static $publicKey;

	// /**
	//  * @static
	//  * @var string|null $jsonWebToken The Json Web Token (lifespan of just a few minutes)
	//  */
	// private static $jsonWebToken;

	// /**
	//  * @static
	//  * @var string|null $lastJsonWebTokenRequestDatetime The date time of the last Json Web Token request
	//  */
	// private static $lastJsonWebTokenRequestDatetime;

	/**
     * AfpaConnect GET
     *
     * @param string $url
     * @param array $parameters
     * 
     * @return bool|string
     */
    private static function get(string $url, array $parameters = [], string $token)
	{
        $ch = curl_init();

        $urlParameters = $url . "?" . http_build_query($parameters, '', '&amp;');

        curl_setopt_array($ch, [
                CURLOPT_URL => $urlParameters,
                CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $token],
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_FOLLOWLOCATION => 1,
                CURLOPT_VERBOSE => 1,
                CURLOPT_SSL_VERIFYPEER => 0
            ]
        );

        return curl_exec($ch);
    }

	/**
	 * Returns the base URL, or a request url.
	 * 
	 * @param string $request The desired request ('' by default)
	 * @return string|null Null on failure
	 */
	private static function getBaseUrl($request = ''): ?string
	{
		global $GLOBALS_INI;
		if ( isset($GLOBALS_INI['AC__BASE_URL']) ) {
			$url = $GLOBALS_INI['AC__BASE_URL'];
			if ( substr($url,strlen($url)-1,1) !== '/') {
				$url .= '/';
			}
			return ($url . $request);
		}
	}
	
	/**
	 * Returns the issuer
	 * 
	 * @return string|null Null on failure
	 */
	private static function getIssuer(): ?string
	{
		global $GLOBALS_INI;
		if ( isset($GLOBALS_INI['AC__ISSUER']) ) {
			return $GLOBALS_INI['AC__ISSUER'];
		}
	}

	/**
	 * Returns the Json Web Token (recently generated or a new one if necessary).
	 * A new token will only be requested if the current token is no longer valid.
	 * 
	 * @return string|null Null on failure
	 */
	public static function getJsonWebToken()
	{
		if (
			// if no token or expired token :
			( !isset($_SESSION['jwt']) || isEmpty($_SESSION['jwt']) ) ||
			( self::getLastJsonWebTokenRequestDatetime() == null ) ||
			( self::getTimeSinceLastTokenRequest() >= self::getJsonWebTokenLifetime() )
		) {
			// renews it
			return self::getNewJsonWebToken();
		}
		return $_SESSION['jwt'];
	}

	/**
	 * Returns the Json Web Token lifetime (in minutes)
	 * 
	 * @return int|null Null on failure
	 */
	private static function getJsonWebTokenLifetime(): ?int
	{
		global $GLOBALS_INI;
		if (
			isset( $GLOBALS_INI['AC__JWT_LIFETIME'] ) &&
			is_numeric( $GLOBALS_INI['AC__JWT_LIFETIME'] ) &&
			is_int( +$GLOBALS_INI['AC__JWT_LIFETIME'] ) &&
			( +$GLOBALS_INI['AC__JWT_LIFETIME'] > 0)
		) {
			return +$GLOBALS_INI['AC__JWT_LIFETIME'];
		}
	}

	/**
	 * Returns the date time of the last token request.
	 * 
	 * @return string DateTime format
	 */
	private static function getLastJsonWebTokenRequestDatetime(): ?string
	{
		if ( isset($_SESSION['last_jwt_request_datetime']) ) {
			return $_SESSION['last_jwt_request_datetime'];
		}
	}

	/**
	 * Renews the Json Web Token from AfpaConnect and return it.
	 * 
	 * @return string|null Null on failure
	 */
	private static function getNewJsonWebToken()
	{
		// get a new json web token from AfpaConnect
		$result = self::post(
			self::getBaseUrl('auth'),
			[
				'issuer' =>			self::getIssuer(),
				'public_key' =>		self::getPublicKey()
			]
		);
		// todo : delete
		log::append_f(
			'afpaAC__renouvellement_token',
			$result
		);
		if ( !isEmpty($result) ) {
			date_default_timezone_set('Europe/Paris');
			$_SESSION['jwt'] = json_decode($result);
			// $_SESSION['jwt'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhZnBhY29ubmVjdCIsImF1ZCI6ImFmcGF0aWNrZXQiLCJleHAiOjE2MTQyNzA4NzB9.W5iuupTqhdH_SXGz2pNf3YUDD3LML7ocuRVrxFfAOFxzz-EPxxAnximKpDmq2DSKRPylnFvobjURvqp7otAPjArohds2PvmWRfyXrGpn4ks4wiGuifcrmqaMrJvOHp9kg4rGRnsOQ8aUTIR1nBUSSWftvandq-myT6QRXr8JMGrJR9iLCkrTgO5lyku6iP1nb-h8roPr4jmgHHA_7qYJOoW3_LIJv3c4LNGIgx0bpdHwJfJQS_Alvq-gUhDRXmFtweK_8WOGfpw0JV1JgKgCqU6EeIZxxiEfIBgRPqqTtQk5dHUnEhvrdmaKzq1F4FvGSDeCAchJyfbj8V-QZdOYMQ';
			$_SESSION['last_jwt_request_datetime'] = date('Y-m-d H:i:s'); // here todo : remove tests
			// $_SESSION['last_jwt_request_datetime'] = '2021-02-25 17:30:40';
			return $_SESSION['jwt'];
			// return json_decode($result);
		}
	}

	/**
	 * Returns the public key which is used to recover afpa users information
	 * 
	 * @return string|null Null on failure
	 */
	private static function getPublicKey()
	{
		global $GLOBALS_INI;
		if ( isEmpty(self::$publicKey) ) {
			$filePath = dirPath( $GLOBALS_INI['PATH_HOME'].'/'.$GLOBALS_INI['AC__PUBLIC_KEY_PATH'], true );
			if ( $filePath === null ) {
				return;
			}
			$filePath .= $GLOBALS_INI['AC__PUBLIC_KEY_FILENAME'];
			self::$publicKey = file_get_contents($filePath);
			return self::$publicKey;
		}
		return self::$publicKey;
	}

	public static function getUsers()
	{
		// "user": {
		// 	"username": "admin",
		// 		"password": "test",
		// 		"beneficiary": "123456789"
		// 	},
		// 	"app": {
		// 	"name": "afpanier",
		// 		"token": "123456789"
		// 	}

		// get a response from AfpaConnect
		$result = json_decode(
			self::get(
				self::getBaseUrl('users'),

				[
					'issuer' =>			self::getIssuer()
				],
				self::getJsonWebToken()
			)
		);
		// todo : delete
		log::append_f(
			'afpaAC__get_users',
			$result
		);
		return $result;
	}

	/**
	 * Returns the time elapsed since the last token request (in minutes).
	 * If no token request has been made, return $resultIfNoRequest.
	 * 
	 * @param int $resultIfNoRequest The value to return if no token request has been made or if an error occured : 1000 by default.
	 * 
	 * @return int
	 */
	private static function getTimeSinceLastTokenRequest(int $resultIfNoRequest = 1000)
	{
		$lastJwtRequestDatetime = self::getLastJsonWebTokenRequestDatetime();
		if ( isEmpty($lastJwtRequestDatetime) ) {
			return $resultIfNoRequest;
		}
		date_default_timezone_set('Europe/Paris');
		$currentDateTime = date('Y-m-d H:i:s');
		$datetime1 = new DateTime($lastJwtRequestDatetime);
		$datetime2 = new DateTime($currentDateTime);
		$interval = $datetime1->diff($datetime2);
		$interval = $interval->format('%i');
		if ( is_numeric($interval) ) {
			return +$interval;
		} else {
			Log::error(
				'◘ AfpaConnect::getTimeSinceLastTokenRequest() ◘',
				'not numeric interval (minutes expected) :',
				$interval
			);
			return $resultIfNoRequest;
		}
	}
	
	/**
	 * Connect an afpa user
	 * 
	 * @param string $userName The user name
	 * @param string $beneficiary It can be :
	 *   - beneficiary code: if afpa trainee, number written on the canteen card (without the last '1')
	 *   - agent code: if employee afpa
	 * @param string $password The password
	 * @todo debug
	 */
	public static function loginUser($userName = 'admin', $beneficiary = '123456789', $password = 'test')
	{
		/**
		 * @var array|string $result AfpaConnect response (decoded)
		*/
		$result = json_decode(
			self::get(
				self::getBaseUrl('auth'),
				[
					'issuer' =>				self::getIssuer(),
					'public_key' =>			self::getPublicKey(),
					'user'   =>		[
						'username'    =>	$userName,
						'password'    =>	$password,
						'beneficiary' =>	$beneficiary
					],
					'app'   =>		[
						'name'    	  =>	self::getIssuer(),
						'token'       =>	self::getJsonWebToken()
					]

				],
				self::getJsonWebToken()
				// 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhZnBhY29ubmVjdCIsImF1ZCI6ImFmcGF0aWNrZXQiLCJleHAiOjE2MTQzMzU2NDV9.qWtz6BCTzwXKn2GJNnqhEoPhWBBJxKQhm9G_rXiOqK_QFLui9nYWtEmQuZkRfCmw1SmkCdcxFnYtaQgngoBktCFrc3IrNaiSMw6V3okxB-WPHoOZ3CujLAaHWTihLvzcOpHJDvnOzwZNX2FEMQzj03qbON9ThkArmp7nuI9s0d0Rhbvcu2n9Mkauz5HFQjFeAB0cvV-8cSRbUqqwjO9TYcChf2tzu8CrjwnNsWtWS_3q1mmg3JhuRh2wdUcM8nbuvkkAYLaM9_35w6zZTqNkbrAaxj3i1wezHPqe91bFHaAehql-Wjlg5yRmf4EGS7KUZMxtmLZk-wIweA749fq00A'
			)
		);
		// todo : delete
		log::append_f(
			'afpaAC__login_user',
			self::getJsonWebToken(),
			$result
		);
		return $result;
	}

	/**
     * AfpaConnect POST (new version)
     *
     * @param string $url
     * @param $parameters
     * @param string $jwt
     * 
     * @return bool|string
     */
	private static function newPost(string $url, $parameters, string $jwt)
	{
		$ch = curl_init();

		curl_setopt_array($ch, array(
				CURLOPT_URL => $url,
				CURLOPT_POST => true,
				CURLOPT_POSTFIELDS => json_encode($parameters),
				CURLOPT_HTTPHEADER => [
					'Authorization: Bearer ' . $jwt,
					'Content-Type: application/json'
				],
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_FOLLOWLOCATION => 1,
				CURLOPT_VERBOSE => 1,
				CURLOPT_SSL_VERIFYPEER => 0
			)
		);
		
		return json_decode( curl_exec($ch) );
	}
	
    /**
     * AfpaConnect POST
     *
     * @param string $url
     * @param array $payload
     * 
     * @return bool|string
     */
    private static function post(string $url, array $payload)
	{
        $ch = curl_init();

        curl_setopt_array($ch, array(
                CURLOPT_URL => $url,
    			// CURLOPT_HTTPHEADER => ['Accept: application/json'],
                CURLOPT_POST => true,
                CURLOPT_POSTFIELDS => $payload,
                CURLOPT_RETURNTRANSFER => 1,
                CURLOPT_FOLLOWLOCATION => 1,
                CURLOPT_VERBOSE => 1,
                CURLOPT_SSL_VERIFYPEER => 0
            )
        );

        return curl_exec($ch);
    }

}