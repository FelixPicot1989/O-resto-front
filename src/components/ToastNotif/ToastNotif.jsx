import './ToastNotif.scss';
import PropTypes from 'prop-types';

function ToastNotif({ success, error, toggleToast }) {
  return (
    <div className={`toast ${success ? 'active success' : ''} ${error ? 'active error' : ''} `}>
      <div className="toast-content">
        <i className={`fas fa-solid check ${success ? 'success fa-check' : ''} ${error ? 'error fa-xmark' : ''}`} />
        <span className="text">
          {success} {error}
        </span>
      </div>
      <i onClick={toggleToast} className="fa-solid close">
        X
      </i>
      <div className={`progress ${success ? 'active success' : ''} ${error ? 'active error' : ''}`} />
    </div>
  );
}

ToastNotif.propTypes = {
  success: PropTypes.string,
  error: PropTypes.string,
  toggleToast: PropTypes.func.isRequired,
};

ToastNotif.defaultProps = {
  success: '', // set a default value for the success prop
  error: '', // set a default value for the error prop
};

export default ToastNotif;
