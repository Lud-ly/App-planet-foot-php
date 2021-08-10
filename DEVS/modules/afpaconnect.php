<?php

/**
 *  Used to log in the afpa user and to recover afpa users information.
 */
class Afpaconnect
{

	/**
	 * @static
	 * @var string|null $publicKey The public key which is used to recover afpa users information
	 */
	private static $publicKey;

	/**
	 * Afpaconnect connect
	 *
	 * @param string $url
	 * @param string $userId
	 * @param string $password
	 * 
	 * @return array
	 */
	public static function connect(string $issuer, string $userId, string $password)
	{
		$aOfDatasConnect = [];
		switch ($userId) {
			case "lucas":
				$aOfDatasConnect =
					[
						"code" =>  "001",
						"message" =>  "User logged successfully",
						"content" =>  [
							"id" =>  4,
							"identifier" =>  "01020304",
							"lastName" =>  "Aufrere",
							"firstName" =>  "Lucas",
							"mailPro" =>  "lucas.aufrere@afpaconnect.fr",
							"mailPerso" =>  "lucas.aufrere@wanadoo.fr",
							"phone" =>  "0606060606",
							"adress" =>  "2 rue de la rue",
							"complementAdress" =>  "Batiment B",
							"zipCode" =>  "34000",
							"city" =>  "Montpellier",
							"country" =>  "France",
							"gender" =>  "0",
							"status" =>  "1",
							"created_at" =>  20210430,
							"updated_at" =>  null,
							"role" =>  [
								"id" =>  1,
								"tag" =>  "ROLE_USER",
								"name" =>  "Rôle utilisateur"
							],
							"function" =>  [
								"id" =>  1,
								"tag" =>  "STAGIAIRE",
								"name" =>  "stagiaire",
								"start_at" =>  20210505,
								"end_at" =>  20211212
							],
							"session" =>  [
								[
									"id" =>  1,
									"tag" =>  "DWWM025",
									"name" =>  "Dev Web et Web Mobile 05/2021-12/2021",
									"start_at" =>  20210505,
									"end_at" =>  20211212,
									"status" =>  1,
									"formation" =>  [
										"id" =>  1,
										"tag" =>  "DWWM",
										"name" =>  "Développeur web et web mobile",
										"degree" =>  "degree",
										"status" =>  1
									]
								]
							],
							"center" =>  [
								"id" =>  1,
								"name" =>  "Saint-Jean de Védas",
								"adress" =>  "rue Jean Mermoz",
								"complementAdress" =>  "zone d'activité",
								"zipCode" =>  "34430",
								"city" =>  "Saint-Jean de Védas",
								"schedule" =>  "schedule",
								"contactMail" =>  "contact@afpa.com",
								"withdrawalPlace" =>  "withdrawalPlace",
								"withdrawalSchedule" =>  "withdrawalSchedule",
								"urlGoogleMap" =>  "https => //www.google.com/maps/place/AFPA/@43.5645741,3.8428852,17z/data=!3m1!4b1!4m5!3m4!1s0x12b6b1e78790b019 => 0x5fe2ea1bc7b758d9!8m2!3d43.5645767!4d3.8450909"
							],
							"financial" =>  [
								"id" =>  1,
								"tag" =>  "PSMIL",
								"name" =>  "Militaire",
								"public_name" =>  "Militaire"
							]
						]
					];
				break;
			case "jijou":
				$aOfDatasConnect =
					[
						"code" =>  "001",
						"message" =>  "User logged successfully",
						"content" =>  [
							"id" =>  1,
							"identifier" =>  "01020304",
							"lastName" =>  "Jean-Jacques",
							"firstName" =>  "Pagan",
							"mailPro" =>  "jj.pagan@afpaconnect.fr",
							"mailPerso" =>  "jj.pagan@wanadoo.fr",
							"phone" =>  "0606060606",
							"adress" =>  "2 rue de la rue",
							"complementAdress" =>  "Batiment B",
							"zipCode" =>  "34000",
							"city" =>  "Montpellier",
							"country" =>  "France",
							"gender" =>  "0",
							"status" =>  "1",
							"created_at" =>  20210430,
							"updated_at" =>  null,
							"role" =>  [
								"id" =>  3,
								"tag" =>  "ROLE_SUPER_ADMIN",
								"name" =>  "Rôle super administrateur"
							],
							"function" =>  [
								"id" =>  3,
								"tag" =>  "FORMATEUR",
								"name" =>  "Formateur",
								"start_at" =>  20210505,
								"end_at" =>  null
							],
							"session" =>  [
								[
									"id" =>  1,
									"tag" =>  "DWWM025",
									"name" =>  "Dev Web et Web Mobile 05/2021-12/2021",
									"start_at" =>  20210505,
									"end_at" =>  20211212,
									"status" =>  1,
									"formation" =>  [
										"id" =>  1,
										"tag" =>  "DWWM",
										"name" =>  "Développeur web et web mobile",
										"degree" =>  "degree",
										"status" =>  1
									]
								],
								[
									"id" =>  2,
									"tag" =>  "CDA01",
									"name" =>  "Concepteur développeur d'application 01/2021-12/2021",
									"start_at" =>  20210105,
									"end_at" =>  20211231,
									"status" =>  1,
									"formation" =>  [
										"id" =>  1,
										"tag" =>  "CDA",
										"name" =>  "Concepteur développeur d'application",
										"degree" =>  "degree",
										"status" =>  1
									]
								]
							],
							"center" =>  [
								"id" =>  1,
								"name" =>  "Saint-Jean de Védas",
								"adress" =>  "rue Jean Mermoz",
								"complementAdress" =>  "zone d'activité",
								"zipCode" =>  "34430",
								"city" =>  "Saint-Jean de Védas",
								"schedule" =>  "schedule",
								"contactMail" =>  "contact@afpa.com",
								"withdrawalPlace" =>  "withdrawalPlace",
								"withdrawalSchedule" =>  "withdrawalSchedule",
								"urlGoogleMap" =>  "https => //www.google.com/maps/place/AFPA/@43.5645741,3.8428852,17z/data=!3m1!4b1!4m5!3m4!1s0x12b6b1e78790b019 => 0x5fe2ea1bc7b758d9!8m2!3d43.5645767!4d3.8450909"
							],
							"financial" =>  [
								"id" =>  5,
								"tag" =>  "AFPA",
								"name" =>  "Salarié Afpa",
								"public_name" =>  "Salarié Afpa"
							]
						]
					];
				break;
			default:
			$aOfDatasConnect = [
				"code" => "007",
				"message" => "Utilisateur et/ou Mot de passe incorrect",
				"url" => "index"
			];
				// $aOfDatasConnect["code"] = "007";
				// $aOfDatasConnect["message"] = "Utilisateur et/ou Mot de passe incorrect";
				// $aOfDatasConnect["url"] = "indexzzz";
				break;
		}

		error_log("Code Connection = " . $aOfDatasConnect["code"]);
		return $aOfDatasConnect;
	}
}
