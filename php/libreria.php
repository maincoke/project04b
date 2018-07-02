<?php
    # ---> Libreria de funciones generales y especificas del buscador <---
    # <------------------------------------------------------------------>
# --> Funcion que realiza la lectura de los datos y los transforma y transfiere al cliente <--
function openDataFile($opentype) {
    $file_data = fopen('../data/data-1.json',$opentype);
    $readed_data = fread($file_data, filesize('../data/data-1.json'));
    $data = json_decode($readed_data, true);
    fclose($file_data);
    return $data;
}
# --> Funcion que filtra y ordena los criterios de seleccion para los elementos selects de la busqueda personalizada <--
function sendItems($select, $alldata) {
    $allitems = [];
    //$item = [];
    foreach ($alldata as $key => $value) {
        if($select == 'Ciudad') {
            array_push($allitems,$alldata[$key]['Ciudad']);
        } else {
            array_push($allitems,$alldata[$key]['Tipo']);
        }
    }
    $filteredItems = array_unique($allitems, SORT_STRING);
    sort($filteredItems);
    return $filteredItems;
}
# --> 
?>