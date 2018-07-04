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
# --> Funcion que filtra los items de vivienda segun los criterios de la busqueda personalizada <--
function getItemsFiltered($alldata, $cdad, $tipo, $preciobj, $precioat) {
    $priceFilter = array_filter($alldata, function($val, $key) use ($preciobj, $precioat) {
        $priceNum = intval(str_replace(',','',substr($val['Precio'],1)));
        if($priceNum >= $preciobj and $priceNum <= $precioat) {
            return $priceNum;
        }
    }, ARRAY_FILTER_USE_BOTH);
    $cityFilter = $cdad != '' ? array_filter($priceFilter, function($val, $key) use ($cdad) {
        return $val['Ciudad'] == $cdad;
    }, ARRAY_FILTER_USE_BOTH) : $priceFilter;
    $typeFilter = $tipo != '' ? array_filter($cityFilter, function($val, $key) use ($tipo) {
        return $val['Tipo'] == $tipo;
    }, ARRAY_FILTER_USE_BOTH) : $cityFilter;
    return $typeFilter;
}
?>