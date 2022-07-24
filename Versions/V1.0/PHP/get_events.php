<?php
header("Content-Type: application/json; charset=UTF-8");
$conn=new mysqli("localhost","root","","dailyplaner");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$script="SELECT * FROM events";
$check=array();
$result = $conn->query($script);
$counter_index=0;
if ($result->num_rows > 0) {
    // output data of each row
   echo "<div id='List_Unchecked' class=\"form-check\">";
    while($row = $result->fetch_assoc()) {

        if ($row["status"] == "null"){
            echo "<div id='event".$row["id"]."'> <i class=\"fas fa-grip-vertical\"></i> <input type=\"checkbox\" value=\"".$row["name"]."\" ".$row['status']."> <label for='".$row["id"]."'> ".$row["name"]."</label></div>";
        }else{
            $check[$counter_index]="<div id='event".$row["id"]."'> <i class=\"fas fa-grip-vertical\"></i> <input type=\"checkbox\" value=\"".$row["name"]."\" ".$row['status']."> <label for='".$row["id"]."'> ".$row["name"]."</label></div>" ;
            $counter_index=$counter_index+1;

        }

    }
} else {
    echo "0 results";
}
echo "</div>  
    <div id='section_check'>";

echo " <div id='checked' class='form-check '>
 <div id='checked_events' >
 <label><i class='fas fa-chevron-down'> </i>  check Events </label> 
</div>
  
  <div id='event_list'> ";
 for ($x = 0; $x < count($check) ; $x++){
    echo $check[$x];
 }
echo "</div>";
$conn->close();
