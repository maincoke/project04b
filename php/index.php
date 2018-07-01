<?php
/**
 *  Funciones de inicializacion de elementos del buscador --->
 */
require 'libreria.php';

$selItems = $_POST['selector'];
$datafile = openDataFile('r');
$send_items = sendItems($selItems, $datafile);

echo json_encode($send_items);
?>