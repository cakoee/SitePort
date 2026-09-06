<?php
session_start();
$num1 = rand(1, 7);
$num2 = rand(1, 7);
$num3 = rand(1, 7);
$bet = filter_input(INPUT_GET,"bet",FILTER_VALIDATE_INT);
$change = 0;
$result = -1;
if($bet > $_SESSION["money"]){
    $assoc = array("result"=>-1); //error value
    echo json_encode($assoc);
    exit();

}
if($num1 === $num2 && $num2 === $num3){
    $result = 2;
    $_SESSION["money"] += 10*$bet;
    $change = 10*$bet;
}else if($num1 === $num2 || $num1 === $num3 || $num2 === $num3){
    $result = 1;
    $_SESSION["money"] += 2*$bet;
    $change = 2*$bet;
}
else{
    $result = 0;
    $_SESSION["money"] -= 1*$bet;
    $change = -1*$bet;
}
$assoc = array("num1"=>$num1, "num2"=>$num2, "num3"=>$num3,"change"=>$change, "result"=>$result, "money"=>$_SESSION["money"]);
if($_SESSION["money"] == 0){
    session_destroy(); //Kill session when no money
}
echo json_encode($assoc);
?>