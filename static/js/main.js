$(document).ready(function() {
	$(".delete-ride").on("click", function(e){
		$target = $(e.target);
		const id = $target.attr("data-id");
		$.ajax({
			type:"DELETE",
			url:"/rides/delete/"+id,
			success: function(response){
				alert("Your ride post has been deleted");
				window.location.href="/rides/my_rides";
			},
			error: function(err){
				console.log(err);
			}
		});
	});
	if($('#filter').prop('checked')==true)
	{
		$('#filter').trigger('change');
		$('#to_from_ucsb_fil').trigger('change');
	}
});

$('#filter').change(function(){
	if($(this).prop('checked')==true)
	{
		$('#term').val('');
		$('#term').prop('disabled',true);
		$('#filterEnabled').show();
	}
	else
	{
		$('#term').prop('disabled',false);
		$('#filterEnabled').hide();
	}
});

$('#to_from_ucsb_fil').change(function() {
	if($(this).val() == 'from')
	{
		$('#areaprompt').text('Destination Area');
		$('#filterspecific').text('Destination City');
	}
	else if($(this).val() == 'to')
	{
		$('#areaprompt').text('Starting Area');
		$('#filterspecific').text('Starting City');
	} 
	else 
	{
		$('#areaprompt').text('Area');
		$('#filterspecific').text('City');
	}
});


$("#to_from_ucsb").change(function() {

	if($(this).val() == "to") {
		if($("#origin").val() == "UCSB") {
			$("#origin").val("");
			$("#origin").attr("placeholder", "Enter the city you will be driving from");
			$("#origin").attr("readonly", false);
		}
		$("#destination").val("UCSB");
		$("#destination").attr("readonly", true);
		
		$("label#areaLabel span#areaLabel_from").show();
		$("label#areaLabel span#areaLabel_to").hide();

 		
		
	} else {
		$("#origin").val("UCSB");
		$("#origin").attr("readonly", true);
		if($("#destination").val() == "UCSB") {
			$("#destination").val("");
			$("#destination").attr("placeholder", "Enter the city you will be driving to");
			$("#destination").attr("readonly", false);
		}
		
		$("label#areaLabel span#areaLabel_from").hide();
		$("label#areaLabel span#areaLabel_to").show();

	}
});
$("#to_from_ucsb").trigger("change");




