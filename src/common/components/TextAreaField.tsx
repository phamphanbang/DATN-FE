import { forwardRef, Textarea, TextareaProps } from '@chakra-ui/react';
import {
  InputWrapper,
  InputWrapperProps,
} from 'common/components/InputWrapper';

type TextFieldFieldProps = TextareaProps & Omit<InputWrapperProps, 'children'>;

export const TextAreaField = forwardRef(
  ({ error, label, isRequired, ...inputProps }: TextFieldFieldProps, ref) => {
    return (
      <InputWrapper label={label} error={error} isRequired={isRequired}>
        <Textarea {...inputProps} type="text" ref={ref} />
      </InputWrapper>
    );
  }
);
