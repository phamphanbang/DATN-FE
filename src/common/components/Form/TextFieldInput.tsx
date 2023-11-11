import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { TextField } from "../TextField";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ValidationErrorMessage } from "models/appConfig";
import { ErrorDisplay } from "../ErrorDisplay";
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, useEffect, useState } from "react";

export type FormParams = Record<
  string,
  string | File
>;
interface ITextFieldInputProps {
  register: UseFormRegister<FormParams>;
  handleChangeValue: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
    , key: string) => void;
  inputKey: string;
  validationError: ValidationErrorMessage[] | [];
  placeholder: string;
  title: string;
  errors: FieldErrors<FormParams>;
  defaultValue?: string;
}

export const TextFieldInput = ({
  register,
  handleChangeValue,
  inputKey,
  validationError,
  errors,
  title,
  placeholder,
  defaultValue
}: ITextFieldInputProps) => {
  const [isValidationErrorDisplay, setIsValidationErrorDisplay] = useState<boolean>(true);

  useEffect(() => {
    if (validationError) setIsValidationErrorDisplay(true);
    else setIsValidationErrorDisplay(false);
  }, [validationError])

  const getValidationMessage = (key: string) => {
    if(typeof validationError == "string") return;
    const error = validationError.find(item => item.type === key);
    if (error) return <ErrorDisplay message={error.message} />
  }

  return (
    <FormControl key={inputKey}>
      <FormLabel fontSize={16} my={1} fontWeight="normal">
        {title}
        <FormHelperText my={1} style={{ color: 'red' }} as="span">
          {' '}
          *
        </FormHelperText>
      </FormLabel>
      <TextField
        h="40px"
        placeholder={placeholder}
        fontSize="sm"
        defaultValue={defaultValue}
        {...register(inputKey, {
          required: `${title} is required`,
          onChange: (e) => {
            handleChangeValue(e, inputKey);
            setIsValidationErrorDisplay(false);
          },
        })}
      />
      {isValidationErrorDisplay && getValidationMessage(inputKey)}
      <ErrorMessage
        errors={errors}
        name={inputKey}
        render={({ message }) => <ErrorDisplay message={message} />}
      />
    </FormControl>
  );
}