import {
  forwardRef,
  NumberInput,
  NumberInputField,
  NumberInputProps,
} from "@chakra-ui/react";
import {
  InputWrapper,
  InputWrapperProps,
} from "common/components/InputWrapper";

type NumberFieldInputProps = NumberInputProps &
  Omit<InputWrapperProps, "children">;

export const NumberField = forwardRef(
  ({ error, label, isRequired, ...inputProps }: NumberFieldInputProps, ref) => {
    return (
      <InputWrapper label={label} error={error} isRequired={isRequired}>
        <NumberInput {...inputProps} type="text" ref={ref}>
          <NumberInputField />
        </NumberInput>
      </InputWrapper>
    );
  }
);
