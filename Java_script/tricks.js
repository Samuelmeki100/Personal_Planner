$(document).ready(function () {

    const xmlhttp = new XMLHttpRequest();
	const monthly=new XMLHttpRequest();
	
	monthly.onload=function() {
		const respo= JSON.parse(this.responseText);
		$("#Amount").text(numberWithCommas(respo[0].Amount));
		$("#month").text(respo[0].title);
	}
	
	//Numbers with Commas
	function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
    xmlhttp.onload = function() {
        const myObj = JSON.parse(this.responseText);
        var Event_id;
        let text = "";
        for (let x in myObj) {
            //if status is null set on check if not then its unchecked
            if(myObj[x].status == "null" ||myObj[x].status =="Null"){
				
                $("#uck_event_list").append("<div id='item_"+myObj[x].id+"' class=\"list-group-item list-group-item-action list-group-flush\" onclick='showandhide("+myObj[x].id+")'><div id='item_main'>\n" +
                    "  <i class=\"fas fa-grip-vertical\"> </i> <input id='box_"+myObj[x].id+"' type=\"checkbox\" value="+myObj[x].id+" onclick='get_event("+myObj[x].id+")' > <label for='"+myObj[x].id+"'>"+myObj[x].Name+"</label>\n" +
                    "<i class=\"fas fa-pencil-alt\" style='float: right;'> </i></div><div id='item_Sub"+myObj[x].id+"'  style='display: none;'>" +
                    "<div id='Event_Amount"+myObj[x].id+"' style=''><h4><span>MKW </span>"+numberWithCommas(myObj[x].amount_allocated)+"</h4></div>" +
                    "<div id='Description'> "+myObj[x].Description+"</div> </div>");
					
            }else if(myObj[x].status=="checked"){
				
                $("#ck_event_list").append("<div id='item_"+myObj[x].id+"' class=\"list-group-item list-group-item-action list-group-flush\" onclick='showandhide("+myObj[x].id+")'><div id='item_main'>\n" +
                    "  <i class=\"fas fa-grip-vertical\"> </i> <input id='box_"+myObj[x].id+"' type=\"checkbox\" value="+myObj[x].id+" onclick='get_event("+myObj[x].id+")' checked> <label for='"+myObj[x].id+"'>"+myObj[x].Name+"</label>\n" +
                    "<i class=\"fas fa-pencil-alt\" style='float: right;'> </i></div><div id='item_Sub"+myObj[x].id+"'  style='display: none;'>" +
                    "<div id='Event_Amount"+myObj[x].id+"' style=''><h4><span>MKW </span>"+numberWithCommas(myObj[x].amount_allocated)+"</h4></div>" +
                    "<div id='Description'> "+myObj[x].Description+"</div> </div>");
					
            }
        }
        countChecked(); $( "input[type=checkbox]" ).on( "click", countChecked );
        $("#checked_events").click(function(){
            $("#ck_event_list").toggle(1000);
        });
    };
	
	
	
	//get monthly allocation
	monthly.open("GET","PHP/get_this_monthly_allocation.php");
	monthly.send()
	
	//get Events
    xmlhttp.open("GET", "PHP/get_events.php");
    xmlhttp.send();
	
	

    //Add new Events to data base
	
	// hide and show things when your writing things
	$("#add_event_Name").click(function(){
		$(".pop").show(900);
		$("#Add_to_list").addClass("pop_open");
		
		
	});
	$("#closeAddW").click(function(){
		$(".pop").hide();
		$("#Add_to_list").removeClass("pop_open");
	})
	
	
    $("#add_event_btn").click(function () {
		
		       //fitter user input
        if($("#add_event_Name").val().length > 5 && $("#add_event_Amount").val().length > 2 && $("#add_event_Description").val().length > 5 ){
			
            $.post("PHP/Insert_and_get_last.php",
                {
                    name: $("#add_event_Name").val(),
					Amount:$("#add_event_Amount").val(),
					Description:$("#add_event_Description").val()
                },function(data, status){
                     if(status=="success"){
                             var goodies= JSON.parse(data);
                         $("#uck_event_list").append("<div id='item_"+goodies[0].id+"' class=\"list-group-item list-group-item-action list-group-flush\" onclick='showandhide("+goodies[0].id+")'><div id='item_main'>\n" +
                    "  <i class=\"fas fa-grip-vertical\"> </i> <input id='box_"+goodies[0].id+"' type=\"checkbox\" value="+goodies[0].id+" onclick='get_event("+goodies[0].id+")' checked> <label for='"+goodies[0].id+"'>"+goodies[0].Name+"</label>\n" +
                    "<i class=\"fas fa-pencil-alt\" style='float: right;'> </i></div><div id='item_Sub"+goodies[0].id+"'  style='display: none;'>" +
                    "<div id='Event_Amount"+goodies[0].id+"' style=''><h4><span>MKW </span>"+numberWithCommas(goodies[0].amount_allocated)+"</h4></div>" +
                    "<div id='Description'> "+goodies[0].Description+"</div> </div>");
                        
                        }
                        else{
                            alert(status);
                        }
                });

        }else{
			alert("Name Should Have more than 5 Charactors");
        }
    });

    var countChecked = function() {
        var n = $( "input:checked" ).length;
        $( "#Checked_counter" ).text(n);
    };
    countChecked();
    $("body").on("load",countChecked());
    $( "input[type=checkbox]" ).on( "click", countChecked );

});

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

// MOve events from checked to un-checked and from un-checked to checked
function get_event(Clicked){
    //find out if checkbox is been checked or not
  let checked_status=  $("#box_"+Clicked).find("input").val();
  if($("#box_"+Clicked).is(":checked")){
     //
      $.get("PHP/Add_TO_checked_events.php?id="+Clicked, function(data, status){
          if(data =="successfully"){
              $("#ck_event_list").append($("#item_"+Clicked));
          }else {
              alert("ERROR: " + data );
          }
      });
  }else {
      $.get("PHP/REmove_TO_checked_events.php?id="+Clicked, function(data, status){
          if(data == "successfully"){
              $("#uck_event_list").append($("#item_"+Clicked));
          }else {
              alert("ERROR: " + data );
          }
      });
  }

}
//Shows and hides  #item_sub
function showandhide(element) {
    //alert("#itemsub"+element);
    //element.toString()
    $("#item_Sub"+element).toggle(1000);
    //document.getElementById(element).style.display="static";
}

function getMonth(){
	
}