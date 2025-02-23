import React from 'react';
import PropTypes from 'prop-types';

const Modal = ( { size, children, onClose, withCloseButton = true } ) => {
    const modalClassName = `modal ${ size }`;

    return (
        <div className="modal-overlay" onClick={ onClose }>
            <div
                className={ modalClassName }
                onClick={ ( e ) => e.stopPropagation() }
            >
                <span className="close-btn" style={ { visibility: withCloseButton ? "visible" : "hidden" } } onClick={ onClose }>
                    <svg
                        width={ 24 }
                        height={ 24 }
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"

                    >
                        <path
                            d="M18 18L6 6"
                            stroke="#666666"
                            strokeWidth={ 2 }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M18 6L6 18"
                            stroke="#666666"
                            strokeWidth={ 2 }
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                </span>
                { children }
            </div>
        </div>
    );
};

Modal.propTypes = {
    size: PropTypes.oneOf( ['small', 'medium', 'large', 'product', "share"] ),
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default Modal;
