import { Input, InputProps, forwardRef } from '@chakra-ui/react';
import {
  InputWrapper,
  InputWrapperProps,
} from 'common/components/InputWrapper';

type FileFieldFieldProps = InputProps & Omit<InputWrapperProps, 'children'>;

export const FileField = forwardRef(
  ({ error, label, isRequired, ...inputProps }: FileFieldFieldProps, ref) => {
    return (
      <InputWrapper label={label} error={error} isRequired={isRequired}>
        <Input {...inputProps} type="file" ref={ref} />
      </InputWrapper>
    );
  }
);
