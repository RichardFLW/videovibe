import { ToastContainer, toast } from 'react-toastify'; // 

const showToast = (message: string) => {
  toast(message, {
    position: "top-right", // Adjust position as needed
    autoClose: 5000, // Auto-close after 5 seconds
    hideProgressBar: false, // Keep progress bar visible
    closeOnClick: true, // Allow click to close
    pauseOnHover: true, // Pause toast on hover
    theme: "light", // Optionally change theme
  });
};

export default showToast;