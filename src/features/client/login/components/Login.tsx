import {
  Box,
  Button,
  FormControl,
  Link,
  VStack,
} from "@chakra-ui/react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { PasswordField } from "common/components/PasswordField";
import { TextField } from "common/components/TextField";
import { useUserLogin } from "api/apiHooks/userHooks";
import { LoginParams } from "models/user";
import { useForm } from "react-hook-form";
import theme from "themes/theme";
import { LocalStorageKeys } from "common/enums";
import { getItem, setItem } from "utils";
import { ErrorDisplay } from "common/components/ErrorDisplay";
import { useEffect, useState } from "react";
import { ErrorResponse, ValidationErrorMessage } from "models/appConfig";
import { AxiosError } from "axios";
import { NavLink } from "common/usercomponents/NavLink";

const initialLoginParams: LoginParams = {
  email: "",
  password: "",
};

const Login = () => {
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

  const { mutateAsync: loginMutate, isLoading: isLoginLoading } = useUserLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginParams>({ defaultValues: initialLoginParams });

  const onLogin = async ({ email, password }: LoginParams) => {
    try {
      const { data } = await loginMutate({
        email: email.trim(),
        password: password.trim(),
      });

      if (data?.token) {
        setItem(LocalStorageKeys.accessToken, data.token);
        setItem(LocalStorageKeys.name, data.name);
        setItem(LocalStorageKeys.isAdmin, data.isAdmin);
        setItem(LocalStorageKeys.avatar,data.avatar);
        setItem(LocalStorageKeys.prevURL, "");
        setItem(LocalStorageKeys.id, data.id);
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
  }

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
        borderRadius={'10px'}
        borderBottom={`1px solid ${theme.colors.borderColor}`}
      >
        <p>
          Đăng nhập ngay để bắt đầu trải nghiệm học tiếng Anh và luyện thi
          TOEIC/IELTS hiệu quả cùng hàng trăm ngàn người dùng mỗi ngày.
        </p>
        <form style={{ width: "100%" }} onSubmit={handleSubmit(onLogin)}>
          <VStack spacing="14px">
            <FormControl key={"email"}>
              <TextField
                h="50px"
                placeholder="Địa chỉ email"
                fontSize="sm"
                error={errors.email?.message}
                {...register("email", {
                  required: "Email không được để trống",
                })}
                onChange={() => removeValidationMessage('email')}
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
                  required: "Mật khẩu không được để trống",
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

            <Button
              mt="14px"
              h="50px"
              type="submit"
              isLoading={isLoginLoading}
              w="full"
              _hover={{ background: "blue.800" }}
              background="blue.600"
              color="white"
            >
              Đăng nhập
            </Button>
          </VStack>
        </form>
        <Box>
          <NavLink to="/register" text="Bạn chưa là một thành viên? Đăng ký ngay!" />
        </Box>
      </VStack>
    </VStack>
  );
};

export default Login;
