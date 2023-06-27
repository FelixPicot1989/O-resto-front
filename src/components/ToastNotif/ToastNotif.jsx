// Import styles and PropTypes library for type control.
import PropTypes from 'prop-types';
import './ToastNotif.scss';

// "ToastNotif" receives three props: success, error, and toggleToast.
function ToastNotif({ success, error, toggleToast }) {
  // This component returns a div which is used to display a notification to the user
  // Depending on whether success or error is true, different CSS classes are added to change the style of the notification
  return (
    <div className={`toast ${success ? 'active success' : ''} ${error ? 'active error' : ''} `}>
      <div className="toast-content">
        <i className={`fas fa-solid check ${success ? 'success fa-check' : ''} ${error ? 'error fa-xmark' : ''}`} />
        <span className="text">
          {success} {error}
        </span>
      </div>
      {/* When the close icon is clicked, the toggleToast function is called to close the notification */}
      <i onClick={toggleToast} className="fa-solid close">
        X
      </i>
      <div className={`progress ${success ? 'active success' : ''} ${error ? 'active error' : ''}`} />
    </div>
  );
}

// Use PropTypes to validate the types of props received by the component
// This helps identify data type bugs and provides documentation of the component's data expectations.
ToastNotif.propTypes = {
  success: PropTypes.string, // success must be a string
  error: PropTypes.string, // error must be a string
  toggleToast: PropTypes.func.isRequired, // toggleToast must be a function and is required
};

// Here, we define default values for the success and error props.
// If these props are not supplied when the component is used, they will be defined as an empty string
ToastNotif.defaultProps = {
  success: '',
  error: '',
};

export default ToastNotif;
