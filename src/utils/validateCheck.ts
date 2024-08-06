import { AlertOptions } from '@/hooks/useAlert';
import { SweetAlertIcon } from 'sweetalert2';

type InputTypes = 'email' | 'password';

export interface ValidationInputProps {
  input: string;
  inputCheck: string;
  inputType: InputTypes;
}

export const validatePhoneNumber = (tel: string) => {
  let result = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  return result.test(tel);
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (
  { input, inputCheck, inputType }: ValidationInputProps,
  showAlert: (options: AlertOptions) => void
): boolean => {
  if (!input || !inputCheck) {
    showAlert({ title: 'Warning', text: '모든 필드를 입력해주세요.', type: 'warning' as SweetAlertIcon });
    return false;
  }
  if (input !== inputCheck) {
    showAlert({ title: 'Error', text: '입력값과 확인란이 일치하지 않습니다.', type: 'error' as SweetAlertIcon });
    return false;
  }
  if (inputType === 'email' && !validateEmail(input)) {
    showAlert({ title: 'Error', text: '유효한 이메일 주소를 입력해주세요', type: 'error' as SweetAlertIcon });
    return false;
  }
  return true;
};
