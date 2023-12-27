import { Box, Button, FormControl, VStack } from "@chakra-ui/react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { PasswordField } from "common/components/PasswordField";
import { TextField } from "common/components/TextField";
import { useLogin, useUserRegister } from "api/apiHooks/userHooks";
import { LoginParams, RegisterParams } from "models/user";
import { useForm } from "react-hook-form";
import theme from "themes/theme";
import { NavLink } from "common/usercomponents/NavLink";
import { AxiosError } from "axios";
import { ErrorDisplay } from "common/components/ErrorDisplay";
import { LocalStorageKeys } from "common/enums";
import { ValidationErrorMessage, ErrorResponse } from "models/appConfig";
import { useState, useEffect } from "react";
import { getItem, setItem } from "utils";

const initialLoginParams: RegisterParams = {
  email: "",
  password: "",
  name: "",
  confirm_password: "",
};

const Register = () => {
  const redirectURL = getItem(LocalStorageKeys.prevURL)
    ? getItem(LocalStorageKeys.prevURL)
    : "/";
  const [isValidationErrorDisplay, setIsValidationErrorDisplay] =
    useState<boolean>(true);
  const [validationError, setValidationError] =
    useState<ValidationErrorMessage[]>();
  useEffect(() => {
    if (validationError) setIsValidationErrorDisplay(true);
    else setIsValidationErrorDisplay(false);
  }, [validationError]);
  const { mutateAsync: loginMutate, isLoading: isLoginLoading } =
    useUserRegister();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterParams>({ defaultValues: initialLoginParams });

  const onRegister = async ({
    email,
    password,
    name,
    confirm_password,
  }: RegisterParams) => {
    try {
      const { data } = await loginMutate({
        email: email.trim(),
        password: password.trim(),
        name: name.trim(),
        confirm_password: confirm_password.trim(),
      });

      if (data?.token) {
        setItem(LocalStorageKeys.accessToken, data.token);
        setItem(LocalStorageKeys.name, data.name);
        setItem(LocalStorageKeys.isAdmin, data.isAdmin);
        setItem(LocalStorageKeys.avatar, data.avatar);
        setItem(LocalStorageKeys.prevURL, "");
        setItem(LocalStorageKeys.id, data.id);
        // navigate(0);
        window.location.href = redirectURL ?? "/";
      }
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
        flex={1}
        mx="auto"
        my={"24px"}
        w={{ base: "full", md: "430px" }}
        justifyContent="center"
        alignItems={"flex-start"}
        spacing="20px"
        p={"24px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        border={`1px solid #c7c7c7`}
      >
        <p>
          Đăng ký ngay để bắt đầu trải nghiệm học tiếng Anh và luyện thi
          TOEIC/IELTS hiệu quả cùng hàng trăm ngàn người dùng mỗi ngày.
        </p>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onRegister)}>
          <VStack spacing="14px">
            <FormControl key={"name"}>
              <TextField
                h="50px"
                placeholder="Tên người dùng"
                fontSize="sm"
                error={errors.name?.message}
                {...register("name", {
                  required: "Tên người dùng không được để trống",
                })}
                onChange={() => removeValidationMessage("name")}
              />
              {isValidationErrorDisplay && getValidationMessage("email")}
            </FormControl>

            <FormControl key={"email"}>
              <TextField
                h="50px"
                placeholder="Địa chỉ email"
                fontSize="sm"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email không được để trống",
                })}
                onChange={() => removeValidationMessage("email")}
              />
              {isValidationErrorDisplay && getValidationMessage("email")}
            </FormControl>

            <FormControl key={'password'}>
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
                onChange={() => removeValidationMessage('password')}
              />
              {isValidationErrorDisplay && getValidationMessage("password")}
            </FormControl>

            <FormControl key={'confirm_password'}>
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
                onChange={() => removeValidationMessage('confirm_password')}
              />
              {isValidationErrorDisplay && getValidationMessage("confirm_password")}
            </FormControl>

            <Button
              mt="14px"
              h="50px"
              type="submit"
              isLoading={isLoginLoading}
              _hover={{ background: "blue.800" }}
              background="blue.600"
              color="white"
              w="full"
            >
              Đăng ký
            </Button>
          </VStack>
        </form>
        <Box>
          <NavLink to="/login" text="Đã có tài khoản? Đăng nhập ngay!" />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Register;
