import { useCallback } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';

const AlertTypes = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
  QUEST: 'question'
};

type AlertType = (typeof AlertTypes)[keyof typeof AlertTypes];

interface AlertOptions {
  title: string;
  text: string;
  type: SweetAlertIcon;
}

const useAlert = () => {
  const showAlert = useCallback(({ title, text, type }: AlertOptions) => {
    Swal.fire({
      title,
      text,
      icon: `${type}`
    });
  }, []);

  const showSuccessAlert = useCallback(
    (title: AlertType, text: string) => {
      showAlert({ title, text, type: 'success' });
    },
    [showAlert]
  );

  const showWarningAlert = useCallback(
    (title: AlertType, text: string) => {
      showAlert({ title, text, type: 'warning' });
    },
    [showAlert]
  );

  const showFailAlert = useCallback(
    (title: AlertType, text: string) => {
      showAlert({ title, text, type: 'error' });
    },
    [showAlert]
  );

  return {
    showAlert,
    showSuccessAlert,
    showWarningAlert,
    showFailAlert
  };
};

export default useAlert;
