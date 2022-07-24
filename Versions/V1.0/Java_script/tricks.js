$(document).ready(function () {

        $("#lis_Container").load("PHP/get_events.php", function(responseTxt, statusTxt, xhr){
             if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
$(document).isReady


});

$(document).on('click','body' ,function() {
       $("#checked_events").click(function(){
        $("#event_list,#event_list label").toggle();
    });
});
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
    const myObj = JSON.parse(this.responseText);
    document.getElementById("demo").innerHTML = myObj.name;
};
xmlhttp.open("GET", "json_demo.txt");
xmlhttp.send();

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("infor_panel").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("infor_panel").style.marginLeft = "0";
}
