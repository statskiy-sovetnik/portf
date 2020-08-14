<?php

$userName = $_POST['name'];
$userEmail = $_POST['email'];
$userDescr = $_POST['descr'];

$messageTitle = "Заказ на сайт";
$messageText = "Заказчик: $userEmail \n $userDescr";
$hostingMail = "info@web-crutches.ru";

$to = "ivangladkikh3@gmail.com, ";
$to .= "ivangladkikh4@gmail.com, ";
$to .= "web-crutches@inbox.ru";

mail($to, $messageTitle, $messageText, "From: $hostingMail");


