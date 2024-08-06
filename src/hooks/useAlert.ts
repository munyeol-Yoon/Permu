import { useCallback } from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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
    (text: string) => {
      showAlert({ title: 'Success', text, type: 'success' as SweetAlertIcon });
    },
    [showAlert]
  );

  const showWarningAlert = useCallback(
    (text: string) => {
      showAlert({ title: 'Warning', text, type: 'warning' as SweetAlertIcon });
    },
    [showAlert]
  );

  const showFailAlert = useCallback(
    (text: string) => {
      showAlert({ title: 'Error', text, type: 'error' as SweetAlertIcon });
    },
    [showAlert]
  );

  const showInfoAlert = useCallback(
    (text: string) => {
      showAlert({ title: 'Info', text, type: 'info' as SweetAlertIcon });
    },
    [showAlert]
  );

  const showQuestAlert = useCallback(
    (text: string) => {
      showAlert({ title: 'Question', text, type: 'question' as SweetAlertIcon });
    },
    [showAlert]
  );

  return {
    showAlert,
    showSuccessAlert,
    showWarningAlert,
    showFailAlert,
    showInfoAlert,
    showQuestAlert
  };
};

export default useAlert;
