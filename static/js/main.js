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
});