function htmlspecialchars_decode(str) 
{
	if (typeof(str) == "string")
	{
		str = str.replace(/&amp;/g, "&");
		str = str.replace(/&quot;/g, "\"");
		str = str.replace(/&#039;/g, "'");
		str = str.replace(/&lt;/g, "<");
		str = str.replace(/&gt;/g, ">");
	}
	return str;
}
/////////////////////////////////////////////////// LES FONCTIONS//////////////////////////////////////////////////	

function loadSettings()	
{
	
	var datas = 
	{
		page : "liste_settings",
		bJSON : 1
	}
	$.ajax(
	{
		type: "POST",
		url: "route.php",
		async: true,
		data: datas,
		dataType: "json",
		cache: false,
	})
	.done(function(result) 
	{
		$("#setting1").val(result[0]["id_setting"]);
		$("#setting2").val(result[0]["label_setting"]);
		$("#setting3").val(result[0]["active_setting"]);
		$("#setting4").val(result[0]["value_setting"]);
	})

	.fail(function(err) {
		console.log('error : ', err);
	}); 	


}


function majSettings()	
{

var datas = 
{
	page : "update_settings",
	bJSON : 1, 
	value_setting: $('#setting4').val()
	
}
$.ajax({
	type: "POST",
	url: "route.php",
	async: true,
	data: datas,
	dataType: "json",
	cache: false,
})
.done(function(result) {
		//console.log("result", result["value_setting"][0])
		result["value_setting"]= $('#setting4').val();
		//console.log("value setting", value_setting)
		loadSettings();
	} 
)
.fail(function(err) {
	console.log('error : ', err);
});
}

$(document).ready(function() {
	loadSettings();
});