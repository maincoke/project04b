<?php
/**
 *  Funciones principales para la ejecucion de busqueda personalizada --->
 */
require 'libreria.php';
$searchType = $_POST['custom'];
$datafile = openDataFile('r');
$send_items = array();
if (boolval($searchType)) {
    $opcCiudad = $_POST['cdad'];
    $opcTipo = $_POST['tipo'];
    $precioBj = $_POST['preciobj'];
    $precioAt = $_POST['precioat'];
    $customsearch = getItemsFiltered($datafile, $opcCiudad, $opcTipo, $precioBj, $precioAt);
    foreach ($customsearch as $key => $value) {
        array_push($send_items, $customsearch[$key]);
    }
} else {
    $send_items = $datafile;
}
echo json_encode($send_items);
?>