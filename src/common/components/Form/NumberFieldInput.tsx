import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister, Controller } from "react-hook-form";
import { ValidationErrorMessage } from "models/appConfig";
import { ErrorDisplay } from "../ErrorDisplay";
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent, useEffect, useState } from "react";
import { NumberField } from "../NumberField";
import { FormParams } from "models/app";

interface ITextFieldInputProps {
  register: UseFormRegister<FormParams>;
  handleChangeValue: (
    valueAsString: string,
    key: string,
    index: number
  ) => void;
  inputKey: string;
  validationError: ValidationErrorMessage[] | [];
  placeholder: string;
  title: string;
  errors?: FieldErrors<FormParams>;
  defaultValue?: string | number;
  min?: number;
  max?: number;
  index?: number;
  value: number | string;
  isDisabled?: boolean;
}

export const NumberFieldInput = ({
  register,
  handleChangeValue,
  inputKey,
  validationError,
  errors,
  title,
  placeholder,
  defaultValue,
  min,
  max,
  index,
  value,
  isDisabled
}: ITextFieldInputProps) => {
  const [isValidationErrorDisplay, setIsValidationErrorDisplay] =
    useState<boolean>(true);

  useEffect(() => {
    if (validationError) setIsValidationErrorDisplay(true);
    else setIsValidationErrorDisplay(false);
  }, [validationError]);

  const getValidationMessage = (key: string) => {
    if (typeof validationError == "string") return;
    // console.log(validationError);
    const error = validationError.find((item) => item.type === key);
    if (error) return <ErrorDisplay message={error.message} />;
  };

  const inputIndex = index ? index : 0;

  return (
    <FormControl key={inputKey}>
      <FormLabel fontSize={16} my={1} fontWeight="normal">
        {title}
        <FormHelperText my={1} style={{ color: "red" }} as="span">
          {" "}
          *
        </FormHelperText>
      </FormLabel>
      <NumberField
        h="40px"
        placeholder={placeholder}
        fontSize="sm"
        defaultValue={defaultValue}
        {...register(inputKey, {
          required: `${title} is required`,
        })}
        onChange={(valueAsString: string, valueAsNumber: number) => {
          handleChangeValue(valueAsString, inputKey, inputIndex);
          setIsValidationErrorDisplay(false);
        }}
        value={(value === "0" || value === "" || value === 0 || isNaN(value as number))  ? "" : value}
        isDisabled={isDisabled ? true : false}
        min={min ?? 0}
        max={max}
      />

      {isValidationErrorDisplay && getValidationMessage(inputKey)}
      {errors && isValidationErrorDisplay ? (
        <ErrorMessage
          errors={errors}
          name={inputKey}
          render={({ message }) => <ErrorDisplay message={message} />}
        />
      ) : (
        ""
      )}
    </FormControl>
  );
};
