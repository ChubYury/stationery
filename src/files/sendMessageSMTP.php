<?php
  /*
    This email handler working on PHPMailer
  */
  use PHPMailer\PHPMailer\PHPMailer;
  use PHPMailer\PHPMailer\Exception;
  use PHPMailer\PHPMailer\SMTP;

  require 'phpmailer/src/PHPMailer.php';
  require 'phpmailer/src/Exception.php';
  require 'phpmailer/src/SMTP.php';

  // Create new e-mail
  $mail = new PHPMailer(true);

  // SMTP Configuration
  $mail->isSMTP();
  $mail->Host = 's10.uahosting.com.ua'; // Your SMTP server
  $mail->SMTPAuth = true;
  $mail->Username = 'mytes781'; // Your Mailtrap username
  $mail->Password = 'cIe573ZS4B'; // Your Mailtrap password
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;

  // Sending plain text email
  $mail->CharSet = 'UTF-8';
  $mail->setLanguage('ru', 'phpmailer/language/phpmailer.lang-ru.php');
  $mail->isHTML(true); // Set email format to plain text
  $mail->Subject = 'Message mail'; // Title email

  // Sender and recipient settings
  $mail->setFrom('mytes781@testmoudules.pp.ua'); // From Name
  $mail->addAddress('testison777@gmail.com'); // Recipient Name nextbaltic@gmail.com

  // Creating body email
  $body = '<h1>Message<h1>';
  
  if(trim(!empty($_POST['email']))){
      $body.='<p><strong>E-mail: </strong>'.$_POST['email'].'</p>';
  }
  if(trim(!empty($_POST['message']))){
      $body.='<p><strong>Message: </strong>'.$_POST['message'].'</p>';
  }
  

  // Add body in email
  $mail->Body = $body;

  // Send the email
  if (!$mail->send()) {
    $message = 'Message could not be. Mailer Error:' . $mail->ErrorInfo;
  } else {
    $message = 'Message has been sent';
  }

  $response = ['message' => $message];
  
  header('Content-type: application/json');
  echo json_encode($response);
?>