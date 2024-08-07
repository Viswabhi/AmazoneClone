// Modal.js

import React from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const Modal = ({ children, closeModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white p-8 max-w-md mx-auto rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </motion.div>
  );
};

export default Modal;
