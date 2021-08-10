<?php
// On vérifie que la méthode POST est utilisée
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        // On vérifie si le champ "recaptcha-response" contient une valeur
        if(empty($_POST['responseRecaptcha']))
        {
            header('Location: index.php');
        }
        else
        {
            if(
                isset($_POST['nom']) && !empty($_POST['nom']) &&
                isset($_POST['prenom']) && !empty($_POST['prenom']) &&
                isset($_POST['telephone']) && !empty($_POST['telephone']) &&
                isset($_POST['email']) && !empty($_POST['email'])&&
                isset($_POST['password']) && !empty($_POST['password'])&&
                isset($_POST['confirmePassword']) && !empty($_POST['confirmePassword'])
            )
            {
                // On nettoie le contenu
                $nom = strip_tags($_POST['nom']);
                $prenom = strip_tags($_POST['prenom']);
                $telephone = strip_tags($_POST['telephone']);
                $email = strip_tags($_POST['email']);
                $password = strip_tags($_POST['password']);
                $confirmePassword = strip_tags($_POST['confirmePassword']);

                // Ici vous traitez vos données
                echo "Votre demande d'inscription a bien été envoyée";
            }
        }
    }
    else
    {
        http_response_code(405);
        echo 'Méthode non autorisée';
    }

    $curl = curl_init();

    curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify?secret=6LdNXAcaAAAAAC62C4GPhE6GSmqfEAH-QoVZrHsX&response=03AGdBq25qy7Vl4f4DG3ONMDwhng6tkkPpfx5iWWyh6u2CJS1xJstYlub6YyYAfcNkfMoRdw5OZKSpT9MxSJmw1WxVH5H6XUv2bXaLMYFcRBDaVCIgvaBKZIz1ZRMWUsSf-7di3Tg-WPRyog2FNCGhq9VFF_gO1-iQufCHMg8LOKjjcitWO-QMEdDHsgwMNIpMjRvtd7RGPKbg5SfOfhqJy6LiF-9gQo2IIRGTXhNEqBVeVX-g2w1GlIcIR4OIA0rqLVKDURNfFoBXuV0-16oc9t3fRvzOlLepdK3t08y2Cn2tgF0qRXejuR6igOofwdhlH8MdOMVVsFU2iRE7kz6rh3cWYNmVs1BVxpDZFRieEbUqoqzy6lxFr1twy0aJ0Z2n_iZ-2ot7k9HjinroXAwoF_DEpYrjPiPflhZurrGCJmIAe0o_0cdCaOCK-AgMi6qORsyT3UNUvA05',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
    error_log($response);
	