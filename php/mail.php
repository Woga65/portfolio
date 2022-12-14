<?php

//might be needed to restrict messages to a certain country
$ip_addr = $_SERVER['REMOTE_ADDR'];
$result = @file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $ip_addr);
if ($result === false) {
  $country = 'DE';
} else {
  $geoplugin = unserialize($result);
  $country = $geoplugin['geoplugin_countryCode'];
}
$country = $ip_addr == '127.0.0.1' ? 'DE' : $country;

switch($_SERVER['REQUEST_METHOD']){
    case("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
    case("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");

        $json = file_get_contents('php://input');
        $params = json_decode($json);
        $submit_btn = 0;

        if ($params) {  //json data
          $json_data = 1;
          $antispam = property_exists($params, 'bcc') ? $params->bcc : 'xyz';
          $email = $params->email;
          $name = $params->name;
          $message = $params->message;
        } else {        //form data as sent by <form action="mail.php" method="post">
          $json_data = 0;
          $antispam = isset($_POST['bcc']) ? $_POST['bcc'] : 'xyz';
          $email = isset($_POST['email']) ? $_POST['email'] : '';
          $name = isset($_POST['name']) ? $_POST['name'] : '';
          $message = isset($_POST['message']) ? $_POST['message'] : '';
          $submit_btn = (isset($_POST['submit-button']) || isset($_POST['prevent-enter-submit'])) ? 1 : 0;
        }

//Your E-mail address goes here
        $recipient = 'contact@your-mail.xyz';
        $subject = "new message from: $name";
        $headers = "From: $name <$email>";

//E-mail is only sent if field bcc exists and is empty
        if ($antispam == '' && ($json_data == 1 || $submit_btn == 1) && ($country == 'DE' || $country == 'AT' || $country == 'CH')) {
          echo '<br><i><h3 align="center">Thank you. Your message has been successfully sent.</h3></i><br>';
          mail($recipient, $subject, "json:$json_data\r\ncountry:$country\r\n \r\n$name\r\n$email\r\n \r\n$message", $headers);
        } else {
          echo '<br><i><h3 align="center">Your message has been sent.</h3></i><br>';
        }
//Your website url goes here
        echo '<p align="center"><a href="https://your-website.xyz/index.html"><br>Please click here, to return to the start page.</a></p>';
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
