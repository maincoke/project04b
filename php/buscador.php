<?php
/**
 *  Funciones principales para la ejecucion de busqueda personalizada --->
 */
require 'libreria.php';
$searchType = $_POST['custom'];
$datafile = openDataFile('r');
$send_items = array();
if ($searchType === true) {
    $opcCiudad = $_POST['cdad'];
    $opcTipo = $_POST['tipo'];
    $precioBj = $_POST['preciobj'];
    $precioAt = $_POST['precioat'];
    $send_items = getItemsFiltered($datafile, $opcCiudad, $opcTipo, $precioBj, $precioAt);
} else {
    $send_items = $datafile;
}
echo json_encode($send_items);
?>