import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // If the modal is not open, don't render anything.

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg">
                {/* Close Button */}
                <button onClick={onClose} className="text-gray-500 float-right">
                    X
                </button>
                <div className="mt-4">
                    {children} {/* This will render the content passed as children */}
                </div>
            </div>
        </div>
    );
};

export default Modal;
