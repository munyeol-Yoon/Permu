type InputTypes = 'email' | 'password';

export interface ValidationInputProps {
  input: string;
  inputCheck: string;
  inputType: InputTypes;
}

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = ({ input, inputCheck, inputType }: ValidationInputProps): boolean => {
  if (!input || !inputCheck) {
    alert('모든 필드를 입력해주세요.');
    return false;
  }
  if (input !== inputCheck) {
    alert('입력값과 확인란이 일치하지 않습니다.');
    return false;
  }
  if (inputType === 'email' && !validateEmail(input)) {
    alert('유효한 이메일 주소를 입력해주세요');
    return false;
  }

  return true;
};
