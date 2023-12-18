import { Box, Button, FormControl, VStack } from "@chakra-ui/react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { PasswordField } from "common/components/PasswordField";
import { TextField } from "common/components/TextField";
import { useLogin, useResetInfoPassword, useUserRegister } from "api/apiHooks/userHooks";
import { IUserResetInfoPassword, LoginParams, RegisterParams } from "models/user";
import { useForm } from "react-hook-form";
import theme from "themes/theme";
import { NavLink } from "common/usercomponents/NavLink";
import { AxiosError } from "axios";
import { ErrorDisplay } from "common/components/ErrorDisplay";
import { LocalStorageKeys } from "common/enums";
import { ValidationErrorMessage, ErrorResponse } from "models/appConfig";
import { useState, useEffect } from "react";
import { getItem, setItem } from "utils";

interface ChangePasswordProps {
    userId: string;
}

const initialLoginParams : IUserResetInfoPassword = {password:"",confirm_password:""}

const ChangePassword = ({userId}  : ChangePasswordProps) => {
  const [isValidationErrorDisplay, setIsValidationErrorDisplay] =
    useState<boolean>(true);
  const [validationError, setValidationError] =
    useState<ValidationErrorMessage[]>();
  useEffect(() => {
    if (validationError) setIsValidationErrorDisplay(true);
    else setIsValidationErrorDisplay(false);
  }, [validationError]);
  const [formParams, setFormParams] = useState<IUserResetInfoPassword>(initialLoginParams);
  const { mutateAsync: resetPassword, isLoading : isResetLoading} = useResetInfoPassword(
    userId,
    formParams
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserResetInfoPassword>({ defaultValues: initialLoginParams });

  const onRegister = async ({
    password,
    confirm_password,
  }: IUserResetInfoPassword) => {
    setFormParams({
        password: password.trim(),
        confirm_password: confirm_password.trim()
    })
    try {
      await resetPassword();
      setFormParams({
        password: "",
        confirm_password: ""
      })
    } catch (error) {
      const err = error as AxiosError;
      const validation = err?.response?.data as ErrorResponse;
      setValidationError(validation.message as ValidationErrorMessage[]);
      return;
    }
  };

  const getValidationMessage = (key: string) => {
    if (typeof validationError == "string" || !validationError) return;
    const error = validationError.find((item) => item.type === key);
    if (error) return <ErrorDisplay message={error.message} />;
  };

  const removeValidationMessage = (key: string) => {
    if (typeof validationError == "string" || !validationError) return;
    const errors = validationError.filter((item) => item.type !== key);
    setValidationError(errors);
  };

  return (
    <VStack>
      <VStack
        // flex={1}
        // mx="auto"
        // my={"24px"}
        // w={{ base: "full", md: "430px" }}
        // justifyContent="center"
        // alignItems={"flex-start"}
        // spacing="20px"
        // p={"24px"}
        // border={`1px solid ${theme.colors.borderColor}`}
        // borderRadius={"10px"}
      >
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onRegister)}>
          <VStack spacing="14px">
            <FormControl key={"password"}>
              <PasswordField
                h="50px"
                placeholder="Mật khẩu"
                fontSize="sm"
                error={errors.password?.message}
                {...register("password", {
                  required: "Mật khẩu không được đẻ trống",
                })}
                iconsProps={{
                  w: "18px",
                  h: "18px",
                }}
                buttonProps={{
                  mr: "10px",
                }}
                value={formParams.password}
                onChange={(e) => {
                    const n = {...formParams}
                    n.password = e.target.value;
                    setFormParams(n)
                    removeValidationMessage("password")}
                }
              />
              {isValidationErrorDisplay && getValidationMessage("password")}
            </FormControl>

            <FormControl key={"confirm_password"}>
              <PasswordField
                h="50px"
                placeholder="Xác nhận mật khẩu"
                fontSize="sm"
                error={errors.password?.message}
                {...register("confirm_password", {
                  required: "Mật khẩu xác nhận không được đẻ trống",
                })}
                iconsProps={{
                  w: "18px",
                  h: "18px",
                }}
                buttonProps={{
                  mr: "10px",
                }}
                value={formParams.confirm_password}
                onChange={(e) => {
                    const n = {...formParams}
                    n.confirm_password = e.target.value;
                    setFormParams(n)
                    removeValidationMessage("confirm_password")}}
              />
              {isValidationErrorDisplay &&
                getValidationMessage("confirm_password")}
            </FormControl>

            <Button
              mt="14px"
              h="50px"
              type="submit"
              isLoading={isResetLoading}
              _hover={{ background: "blue.800" }}
              background="blue.600"
              color="white"
              w="full"
            >
              Cập nhật mật khẩu
            </Button>
          </VStack>
        </form>
      </VStack>
    </VStack>
  );
};

export default ChangePassword;
