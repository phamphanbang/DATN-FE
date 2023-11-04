import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { Control, FieldErrors } from "react-hook-form";
import { ValidationErrorMessage } from "models/appConfig";
import { ErrorDisplay } from "../ErrorDisplay";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { SearchableSelectField } from "../SearchableSelectField";
import { option } from "common/types";

export type FormParams = Record<
  string,
  string | File
>;
interface ISelectFieldInputProps {
  handleSelectChangeValue: (value: string, key: string) => void;
  inputKey: string;
  validationError: ValidationErrorMessage[] | [];
  title: string;
  errors: FieldErrors<FormParams>;
  value: string;
  selectOptions: option[];
  control: Control;
}

export const SelectFieldInput = ({
  handleSelectChangeValue,
  inputKey,
  validationError,
  errors,
  title,
  value,
  selectOptions,
  control
}: ISelectFieldInputProps) => {
  const [isValidationErrorDisplay, setIsValidationErrorDisplay] = useState<boolean>(true);

  useEffect(() => {
    if (validationError) setIsValidationErrorDisplay(true);
    else setIsValidationErrorDisplay(false);
  }, [validationError])

  const getValidationMessage = (key: string) => {
    const error = validationError.find(item => item.type === key);
    if (error) return <ErrorDisplay message={error.message} />
  }

  return (
    <FormControl key={inputKey}>
      <FormLabel
        fontSize={16}
        my={1}
        fontWeight="normal"
      >
        {title}
        <FormHelperText my={1} style={{ color: 'red' }} as="span">
          {' '}
          *
        </FormHelperText>

      </FormLabel>
      <SearchableSelectField
        name={inputKey}
        control={control}
        options={selectOptions}
        value={value}
        handleChange={handleSelectChangeValue}
        
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