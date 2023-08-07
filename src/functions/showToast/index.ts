import { toast } from 'react-toastify/dist';

/**
 * This function is used to show a toast message
 */
export const showToast = (message: string) => {
  toast.info(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false,
  });
};
