errors = [10];
civilityError = "";
lastNameError = "";
firstNameError = "";
birthdateError = "";
userNameError = "";
emailAdressError = "";
phoneNumberError = "";
codeError = "";
passwordError = "";
passwordConfirmationError = "";

function CheckCivility()
{
	// Get all civility radio buttons.
	var radios = document.getElementsByName("input_signin_civility");

	var civility;

	// Check for a checked radio button, and when one is found, get its value then break.
	for(var i = 0,length = radios.length; i < length; i++)
	{
		if(radios[i].checked)
		{
			value = radios[i].value;
			break;
		}
	}

	// If civility is not defined, display an error message.
	if(!civility)
	{
		errors[0] = "Vous devez renseigner votre civilité.";
		document.getElementById("civility_alert").innerHTML = errors[0];
		document.getElementById("civility_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("civility_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckLastName()
{
	// Get last name's value.
	var lastName = document.getElementById("input_signin_lastname").value;

	// If last name is empty, display an error message.
	if(!lastName)
	{
		errors[1] = "Vous devez renseigner votre nom.";
		document.getElementById("lastname_alert").innerHTML = errors[1];
		document.getElementById("lastname_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("lastname_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckFirstName()
{
	// Get first name's value.
	var firstName = document.getElementById("input_signin_firstname").value;

	// If first name is empty, display an error message.
	if(!firstName)
	{
		errors[2] = "Vous devez renseigner votre pr&eacute;nom.";
		document.getElementById("firstname_alert").innerHTML = errors[2];
		document.getElementById("firstname_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("firstname_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckBirthDate()
{
	// Get birth date's value.
	var birthDate = document.getElementById("input_signin_birthdate").value;

	// If birth date is empty, display an error message.
	if(!birthDate)
	{
		errors[3] = "Vous devez renseigner votre date de naissance.";
		document.getElementById("birthdate_alert").innerHTML = errors[3];
		document.getElementById("birthdate_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("birthdate_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckUserName()
{
	// Get user name's value.
	var userName = document.getElementById("input_signin_username").value;

	// If user name is empty, display an error message.
	if(!userName)
	{
		errors[4] = "Vous devez renseigner un nom d'utilisateur.";
		document.getElementById("username_alert").innerHTML = errors[4];
		document.getElementById("username_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("username_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckEmailAdress()
{
	// Get email adress' value.
	var emailAdress = document.getElementById("input_signin_emailadress").value;

	// If email adress is empty, display an error message.
	if(!emailAdress)
	{
		errors[5] = "Vous devez renseigner une adresse courriel.";
		document.getElementById("emailadress_alert").innerHTML = errors[5];
		document.getElementById("emailadress_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("emailadress_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckPhoneNumber()
{
	// Get phone number's value.
	var phoneNumber = document.getElementById("input_signin_phonenumber").value;

	// If phone number is empty, display an error message.
	if(!phoneNumber)
	{
		errors[6] = "Vous devez renseigner un num&eacute;ro de t&eacute;l&eacute;phone.";
		document.getElementById("phonenumber_alert").innerHTML = errors[6];
		document.getElementById("phonenumber_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("phonenumber_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckCode()
{
	// Get code's value.
	var code = document.getElementById('input_signin_code').value;

	// If code is empty, display an error message.
	if(!code)
	{
		errors[7] = "Vous devez renseigner votre code agent/b&eacute;n&eacute;ficiaire.";
		document.getElementById("code_alert").innerHTML = errors[7];
		document.getElementById("code_alert").style.display = "block";
	}
	// Else, ensure the error message isn't displayed.
	else
	{
		document.getElementById("code_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckPassword()
{

	// Get password and password confirmation.
	var password = document.getElementById("input_signin_password").value;

	// If password is empty, display an error message and make sure password confirmation error messages aren't displayed.
	if(!password)
	{
		errors[8] = "Vous devez renseigner un mot de passe.";
		document.getElementById("password_alert").innerHTML = errors[8];
		document.getElementById("password_alert").style.display = "block";

		document.getElementById("passwordconfirmation_alert").style.display = "none";
	}
	// Else, make sure password's error message is not displayed.
	else
	{
		document.getElementById("password_alert").style.display = "none";
	}

	CheckErrors();
}

function CheckPasswordConfirmation()
{
	// Get password and password confirmation.
	var password = document.getElementById("input_signin_password").value;
	var confirmationPassword = document.getElementById("input_signin_passwordconfirmation").value;

	if(password)
	{
		// If password confirmation is empty, display the null error message, and make sure the different error message is not displayed.
		if(!confirmationPassword)
		{
			errors[9] = "Vous devez confirmer votre mot de passe.";
			document.getElementById("passwordconfirmation_alert").innerHTML = errors[9];
			document.getElementById("passwordconfirmation_alert").style.display = "block";
		}
		// Else if password confirmation is different from password, display the different error message, and make sure the null error message is not displayed.
		else if(confirmationPassword != password)
		{
			errors[9] = "La confirmation du mot de passe doit correspondre au mot de passe.";
			document.getElementById("passwordconfirmation_alert").innerHTML = errors[9];
			document.getElementById("passwordconfirmation_alert").style.display = "block";
		}
		// Else, make sure no error message is displayed.
		else
		{
			document.getElementById("passwordconfirmation_alert").style.display = "none";
		}
	}

	CheckErrors();
}

function CheckErrors()
{
	errorMessageBoxes = document.getElementsByClassName("alert");
	// Hide the form's error message box.
	document.getElementById("form_alert").style.display = "none";

	// Check for an error, and when one is found, change form's error message box display mode to block then break.
	for(var i = 0; i < errorMessageBoxes.length; i++)
	{
		if(errorMessageBoxes[i].style.display == "block")
		{
			document.getElementById("form_alert").style.display = "block";
			break;
		}
	}


}