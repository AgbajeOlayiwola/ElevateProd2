import React, { useEffect } from 'react';
import DashLayout from '../../../../components/layout/Dashboard';
import Modal from 'react-modal';
import PaylinkLayout from '../../../../components/layout/Paylink';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '43%',
        width: '39%',
        color: '#3e3e3e',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
const Paylink = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        openModal();
    }, []);

    return (
        <DashLayout>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <PaylinkLayout />
            </Modal>
        </DashLayout>
    );
};

export default Paylink;
