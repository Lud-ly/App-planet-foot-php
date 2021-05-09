
/**
 * Permite to :
 *  - Load / hide the loading modal.
 *  - Hide all modals.
 * 
 * @abstract
 */
class Modal {
        /**
         * Returns the loading modal
         * 
         * @param {bool} jQuery If true : returns a jQuery object
         * 
         * @returns {object}
         */
        static getLoadingModal(jQuery = true) {
            const MODAL_ID = 'loadingModal';
            return jQuery ? $('#' + MODAL_ID) : document.getElementById(MODAL_ID);
        }

        /**
         * Hide all modals
         */
        static hideAll() {
            hideLoadingModal();
            $('.modal').hide();
        }

        /**
         * Hide the loading modal
         */
        static hideLoading() {
            Modal.getLoadingModal().hide();
        }

        /**
         * Show the loading modal
         */
        static showLoading() {
            Modal.getLoadingModal().show();
        }
}

