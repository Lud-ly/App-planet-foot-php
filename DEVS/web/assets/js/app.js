// ◘◘ >> PROJECT VARS

var bIsLocalHost = true;


// ◘◘ >> PROJECT FUNCTIONS

/**
 * Hide the loading modal
 */
function hideLoadingModal() {
	$('#loadingModal').hide();
}

/**
 * Returns whether the website is running locally
 * 
 * @returns {boolean}
 */
 function isLocalhost() {
    return bIsLocalHost;
}

/**
 * Show the loading modal
 */
 function showLoadingModal() {
	$('#loadingModal').show();
}