<?php

$firstname = $_REQUEST['firstName'];
$lastname = $_REQUEST['lastname'];
$gender = $_REQUEST['gender'];
$password = $_REQUEST['pass'];
$email = $_REQUEST['email'];


if (isset($_POST['submit'])) {
    $host = "localhost";
    $user = "root";
    $password = "";
    $db = "user_information";


    $conn = mysqli_connect($host, $user, $password, $db);




    $insert = "INSERT INTO user_data VALUES('$firstname', '$lastname', '$gender', '$password', '$email')";
    $result = mysqli_query($conn, $insert);

    if ($result) {
        echo("<h1>Your Registration is Done!</h1>");
    } else {
        echo("<h1>There is an Error!</h1>");
    }

    mysqli_close($conn);
}

?>