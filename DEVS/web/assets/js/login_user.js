errors = [2];

function CheckForm()
{
	// Get identifier's value.
	var identifier = document.getElementById("input_login_identifier").value;

	// If identifier is empty, display an error message.
	if(!identifier)
	{
		errors[0] = "Vous devez renseigner votre identifiant.";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		identifierError = "";
	}

	// Get password and password confirmation.
	var password = document.getElementById("input_login_password").value;

	// If password is empty, display an error message and make sure password confirmation error messages aren't displayed.
	if(!password)
	{
		errors[1] = "Vous devez renseigner un mot de passe.";
	}
	// Else, make sure password's error message is not displayed.
	else
	{
		passwordError = "";
	}

	// Hide the form's error message box.
	document.getElementById("form_alert").style.display = "none";
	document.getElementById("form_alert").innerHTML = "";

	// Check for an error, and when one is found, change form's error message box display mode to block then break.
	for(var i = 0; i < errors.length; i++)
	{
		if(errors[i])
		{
			document.getElementById("form_alert").style.display = "block";
			document.getElementById("form_alert").innerHTML = "";
		}
	}
}