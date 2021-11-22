<?php

$number = [];

$limit = 9999;

$numero = "419200";

$msg = '';
for ($i=0; $i <= $limit; $i++) { 
   if ($i < 10) {
    $msg .=  $numero . "-000" . $i . "\n";
   }
   if ($i >= 10 && $i < 100) {
    $msg .=  $numero . "-00" . $i . "\n";
   }
   if ($i >= 100 && $i < 1000) {
    $msg .=  $numero . "-0" . $i . "\n";
   }
   if ($i > 999) {
    $msg .=  $numero . "-" . $i . "\n";
   }
}

echo $msg;

?>