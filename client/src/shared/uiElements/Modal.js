import React from 'react';
import styles from './Modal.module.css';
import { RiCloseLine } from 'react-icons/ri';

const Modal = ({ setIsOpen, title, content, confirm }) => {
  return (
    <>
     <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
              <p>{content}</p>           
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={confirm}>
                Usuń
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Wróć
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
