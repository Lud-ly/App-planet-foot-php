<?php
require_once 'input_control.php';
require_once "notif__service.php";
require_once "adm_setting__service.php";

/**
 * Class notif | fichier notif.php
 *
 * Contains the config necessary to check the data before interacting with the database.
 * Also contains the business services object.
 *
 * Used by 'header_client.js'
 * 
 * Needs :
 *     • require_once "input_control.php";
 *     • require_once "notif__save_params.php";
 *     • require_once "notif__service.php";
 *
 * @package Afpanier v3 Project
 * @subpackage notif
 * @author @AfpaLabTeam - Damien
 * @copyright  1920-2080 Afpa Lab Team - CDA 20303
 * @version v3.0
 */

Class Notif	{

    // ◘ EMAILS
    /**
     * @var string RECIPIENT_EMAIL The email address to send notification emails from
     */
    const RECIPIENT_EMAIL = 'no_reply@afpanier.fr';

    /**
     * @var string VALIDATION_EMAIL_CONTENT The content of the e-mail that will be sent to users who must validate their orders
     */
    const VALIDATION_EMAIL_CONTENT = '<strong>Important: </strong>Vous devez valider votre commande avant le {weekday_fr} {day_1} {month_fr} {year_4} {hour_1}h{min_2}.';

    /**
     * @var string PAYMENT_EMAIL_CONTENT The content of the e-mail that will be sent to users who must validate their orders
     */
    const PAYMENT_EMAIL_CONTENT = '<strong>Important: </strong>Vous devez régler votre commande avant le {weekday_fr} {day_1} {month_fr} {year_4} {hour_1}h{min_2}.';

    /**
     * @var string RECOVERY_EMAIL_CONTENT The content of the e-mail that will be sent to users who must validate their orders
     */
    const RECOVERY_EMAIL_CONTENT = '<strong>Important: </strong>Vous devez récupérer votre commande avant le {weekday_fr} {day_1} {month_fr} {year_4} {hour_1}h{min_2}.';

    // ◘ NOTIFS
    /**
     * @var string VALIDATION_NOTIF_CONTENT The content of the notif that will be show to the connected user who must validate their orders
     */
    const VALIDATION_NOTIF_CONTENT = '<strong>Important: </strong>Vous devez valider votre commande "{purchase_reference}" avant le {weekday_fr} {day_1} {month_fr} {year_4} {hour_1}h{min_2}.';

    /**
     * @var string PAYMENT_NOTIF_CONTENT The content of the notif that will be show to the connected user who must validate their orders
     */
    const PAYMENT_NOTIF_CONTENT = '<strong>Important: </strong>Vous devez régler votre commande "{purchase_reference}" avant le {weekday_fr} {day_1} {month_fr} {year_4} {hour_1}h{min_2}.';

    /**
     * @var string RECOVERY_NOTIF_CONTENT The content of the notif that will be show to the connected user who must validate their orders
     */
    const RECOVERY_NOTIF_CONTENT = '<strong>Important: </strong>Vous devez récupérer votre commande "{purchase_reference}" avant le {weekday_fr} {day_1} {month_fr} {year_4} {hour_1}h{min_2}.';

    // ◘ PARAMS / PROPS
    /**
     * @var string[] PARAMS Name of parameters used for notifications 
     */
    const PARAMS = ['crcdValidation', 'validationTime', 'paymentTime', 'recoveryTime'];

    // ◘ DATABASE DATA - concerns ALL USERS
    /**
     * @property array|null $validationNotifsInfos Contains the information concerning the orders to be validated
     */
    private $validationNotifsInfos;

    /**
     * @property array|null $paymentNotifsInfos Contains the information concerning the orders to be paid
     */
    private $paymentNotifsInfos;

    /**
     * @property array|null $recoveryNotifsInfos Contains the information concerning the orders to be recovered
     */
    private $recoveryNotifsInfos;

    // ◘ DATABASE DATA - concerns the CONNECTED USER
    /**
     * @property array|null $connectedUser_validationNotifsInfos Contains the information concerning the orders to be validated
     */
    private $connectedUser_validationNotifsInfos;

    /**
     * @property array|null $connectedUser_paymentNotifsInfos Contains the information concerning the orders to be paid
     */
    private $connectedUser_paymentNotifsInfos;

    /**
     * @property array|null $connectedUser_recoveryNotifsInfos Contains the information concerning the orders to be recovered
     */
    private $connectedUser_recoveryNotifsInfos;


    // ◘ OTHER
    /**
     * @property object $notif_service Notif services
     * 
     */
    private $notif_service;

    /**
     * @property array $params Contains the parameters which are used for notifications.
     * 
     */
    private $params;

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
    public function __construct() {
        // init variables resultat
        $this->resultat = [];

        // execute main function
        $this->main();
    }

    /**
     *
     * Destroy service
     *
     */
    public function __destruct() {
        // destroy objet_service
        unset($objet_service);
    }

    /**
     * Get interface to gestion of notifications
     */
    private function main() {
		$this->notif_service = new Notif__service();
		$setting_service = new Adm_setting__service();

		$this->VARS_HTML = $setting_service->VARS_HTML;

        if (isset($this->VARS_HTML['action'])) {
            switch ($this->VARS_HTML['action']) {
                case 'update_read_status':
                    // UPDATE THE READ STATUS
                    $aResult = $this->notif_service->updateReadStatus(
                        $this->VARS_HTML['purchaseId'],
                        Notif::getAlreadyReadField($this->VARS_HTML['fieldType'])
                    );
                    send_json_to_JS($aResult);
            }
        } else {
            // RECOVER NOTIFICATIONS PARAMETERS
            $this->params = $setting_service->getParams(true, Notif::PARAMS);
            // missing infos ?
            if ( ($this->params == null) || (count($this->params) !== count(Notif::PARAMS)) ) {
                // yes, error : returns
                return;
            }

            // ◘ concerns all USERS
            $this->sendNotifEmails();

            // ◘ concerns only the CONNECTED USER
            $this->getConnectedUserNotifsInfos();
            $this->addPageNotifsInfos();
            $connectedUserNotifs = $this->getConnectedUserNotifs();
            send_json_to_JS($connectedUserNotifs);
        }
    }

    /**
     * Returns the notifications to be displayed on the logged in user page
     * 
     */
    private function getConnectedUserNotifs() {
        $allNotifsResult = [];
        $arrays = [$this->connectedUser_validationNotifsInfos, $this->connectedUser_paymentNotifsInfos, $this->connectedUser_recoveryNotifsInfos];
        foreach ($arrays as $arr) {
            if (isEmpty($arr)) {
                continue;
            }
            $i = key($arrays);
            foreach ($arr as $notif) {
                if (isEmpty($arr)) {
                    continue;
                }
                // prepare the result sub-array
                $notifResult = [];
                $notifResult['message'] = $notif['message'];
                $notifResult['purchaseId'] = $notif['id_purchase'];
                $notifResult['alreadyRead'] = $notif['alreadyRead'];
                $notifResult['fieldType'] = $notif['fieldType'];
                $notifResult['endDate'] = $notif['endDate'];
                array_push($allNotifsResult, $notifResult);
            }
            next($arrays);
        }
        $allNotifsResult = recordSort($allNotifsResult, 'endDate');
        return $allNotifsResult;
    }

    /**
     * Returns informations about all notifications to be displayed on the logged in user page
     * 
     */
    private function getConnectedUserNotifsInfos() {
        $this->connectedUser_validationNotifsInfos = $this->notif_service->getUnvalidatedOrders(+$this->params['validationTime'], $_SESSION['id_user']);
        $this->connectedUser_paymentNotifsInfos = $this->notif_service->getUnpaidOrders(+$this->params['paymentTime'], $_SESSION['id_user']);
        $this->connectedUser_recoveryNotifsInfos = $this->notif_service->getUnrecoveredOrders(+$this->params['recoveryTime'], $_SESSION['id_user']);
    }
            
    /**
     * Retrieves information about the notification emails to send, and sends the emails to all affected users
     * 
     */
    private function sendNotifEmails() {
        // clear the log
        Log::f(
            'notif__all_users__sendEmail'
        );

        // retrieves information about the emails to send
        $this->validationNotifsInfos = $this->notif_service->getUnvalidatedOrders(+$this->params['validationTime']);
        $this->paymentNotifsInfos = $this->notif_service->getUnpaidOrders(+$this->params['paymentTime']);
        $this->recoveryNotifsInfos = $this->notif_service->getUnrecoveredOrders(+$this->params['recoveryTime']);
        
        // generate and add information
        $this->addEmailsNotifsInfos();

        // send e-mails
        $this->sendNotifEmails_PurchasesToValidate();
        $this->sendNotifEmails_PurchasesToPay();
        $this->sendNotifEmails_PurchasesToRecover();
    }

    /**
     * Send an email to all users who need to validate their purchase
     * 
     * @return int The number of emails that have been sent
     */
    private function sendNotifEmails_PurchasesToValidate() {
        if (isEmpty($this->validationNotifsInfos)) {
            return 0;
        }
        $arr =& $this->validationNotifsInfos;
        foreach ($arr as &$notif) {
            if (isEmpty($notif)) {
                continue;
            }
            sendEmail(
                $notif['user_mail'],
                Notif::RECIPIENT_EMAIL,
                'Important : votre commande "' . $notif['purchase_reference'] . '"',
                $notif['message']
            );
        }
    }

    /**
     * Send an email to all users who need to pay for their purchase
     * 
     * @return int The number of emails that have been sent
     */
    private function sendNotifEmails_PurchasesToPay() {
        if (isEmpty($this->paymentNotifsInfos)) {
            return 0;
        }
        $arr =& $this->paymentNotifsInfos;
        foreach ($arr as &$notif) {
            sendEmail(
                $notif['user_mail'],
                Notif::RECIPIENT_EMAIL,
                'Important : votre commande "' . $notif['purchase_reference'] . '"',
                $notif['message']
            );
        }
    }

    /**
     * Send an email to all users who need to recover their purchase
     * 
     * @return int The number of emails that have been sent
     */
    private function sendNotifEmails_PurchasesToRecover() {
        if (isEmpty($this->recoveryNotifsInfos)) {
            return 0;
        }
        $arr =& $this->recoveryNotifsInfos;
        foreach ($arr as $notif) {
            sendEmail(
                $notif['user_mail'],
                Notif::RECIPIENT_EMAIL,
                'Important : votre commande "' . $notif['purchase_reference'] . '"',
                $notif['message']
            );
        }
    }

    /**
     * Generate and add the notif message into all e-mails notifs which concerns all users
     * 
     */
    private function addEmailsNotifsInfos() {
        $this->addInfos(
            $this->validationNotifsInfos,
            'validation',
            false
        );
        $this->addInfos(
            $this->paymentNotifsInfos,
            'payment',
            false
        );
        $this->addInfos(
            $this->recoveryNotifsInfos,
            'recovery',
            false
        );
    }

    /**
     * Generate and add the notif message into all notifs which concerns the connected user
     * 
     */
    private function addPageNotifsInfos() {
        $this->addInfos(
            $this->connectedUser_validationNotifsInfos,
            'validation',
            true
        );
        $this->addInfos(
            $this->connectedUser_paymentNotifsInfos,
            'payment',
            true
        );
        $this->addInfos(
            $this->connectedUser_recoveryNotifsInfos,
            'recovery',
            true
        );
    }

    // ◘ STATIC METHODS
    /**
     * Generate and add notifs informations into all provided notifs (into 'message' field).
     * also adds a field named 'alreadyRead'.
     * 
     * @param array &$notifs All notifs infos
     * @param string $fieldType The field type among :
     *  - 'validation'
     *  - 'payment'
     *  - 'recovery'
     * @param string $pageNotif If true : returns the page notif message. Else : the e-mail notif message.
     */
    private static function addInfos(&$notifs, $fieldType = 'validation', $pageNotif = true) {
        foreach ($notifs as &$notif) {
            if (isEmpty($notif)) {
                continue;
            }
            $endDateField = Notif::getEndDateField($fieldType);
            $endDate = $notif[$endDateField];
            $replacements = getDatetimeInfos($endDate);
            $replacements['purchase_reference'] = $notif['purchase_reference'];
            $notif['message'] = Notif::getInitialMessage(
                $fieldType,
                $pageNotif
            );
            // replace all fields into the message
            $notif['message'] = replaceFields($notif['message'], $replacements);
            $alreadyReadField = Notif::getAlreadyReadField($fieldType);
            $notif['alreadyRead'] = $notif[$alreadyReadField];
            $notif['fieldType'] = $fieldType;
            $notif['endDate'] = $notif[ Notif::getEndDateField($fieldType) ];
        }
    }

    /**
     * Returns the 'end date' field name
     * 
     * @param string $fieldType The field type among :
     *  - 'validation'
     *  - 'payment'
     *  - 'recovery'
     * 
     * @return string
     */
    private static function getEndDateField($fieldType = 'validation') {
        switch ($fieldType) {
            case 'validation':
                return 'basket_end_validation_date';
            case 'payment':
                return 'basket_payment_end_date';
            case 'recovery':
                return 'basket_withdrawal_end_date';
        }
    }

    /**
     * Returns the 'already read' field name
     * 
     * @param string $fieldType The field type among :
     *  - 'validation'
     *  - 'payment'
     *  - 'recovery'
     * 
     * @return string
     */
    private static function getAlreadyReadField($fieldType = 'validation') {
        switch ($fieldType) {
            case 'validation':
                return 'purchase_reservationNotif_read';
            case 'payment':
                return 'purchase_paymentNotif_read';
            case 'recovery':
                return 'purchase_withdrawal_read';
        }
    }

    /**
     * Returns the initial message
     * 
     * @param string $fieldType The field type among :
     *  - 'validation'
     *  - 'payment'
     *  - 'recovery'
     * @param string $pageNotif If true : returns the page notif message. Else : the e-mail notif message.
     * 
     * @return string
     */
    private static function getInitialMessage($fieldType = 'validation', $pageNotif = true) {
        switch ($fieldType) {
            case 'validation':
                return ($pageNotif) ? Notif::VALIDATION_NOTIF_CONTENT : Notif::VALIDATION_EMAIL_CONTENT;
            case 'payment':
                return ($pageNotif) ? Notif::PAYMENT_NOTIF_CONTENT : Notif::PAYMENT_EMAIL_CONTENT;
            case 'recovery':
                return ($pageNotif) ? Notif::RECOVERY_NOTIF_CONTENT : Notif::RECOVERY_EMAIL_CONTENT;
        }
    }
}

?>

