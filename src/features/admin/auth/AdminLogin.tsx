// import { useState } from 'react';
import { Box, Heading, VStack, Button, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PasswordField } from "common/components/PasswordField";
import { TextField } from "common/components/TextField";
import LoginBackground from "assets/images/Admin_login_background.jfif";
import { useLogin } from "api/apiHooks/userHooks";
import { getItem, setItem } from "utils";
import { LocalStorageKeys } from "common/enums";
import { LoginParams } from "models/user";

const initialLoginParams: LoginParams = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  // const redirectURL = getItem(LocalStorageKeys.prevURL)
  //   ? getItem(LocalStorageKeys.prevURL)
  //   : "/admin/users";
  const redirectURL = "/admin/users";

  useEffect(() => {
    const accessToken: string | null = getItem(LocalStorageKeys.accessToken);
    const isAdmin = getItem(LocalStorageKeys.isAdmin) === 'true' ? true : false;
    if (accessToken && isAdmin) {
      window.location.href = "/admin/users";
    }
  }, []);

  const { mutateAsync: loginMutate, isLoading: isLoginLoading } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginParams>({ defaultValues: initialLoginParams });

  const onLogin = async ({
    email,
    password
  }: LoginParams) => {
    const { data } = await loginMutate({
      email: email.trim(),
      password: password.trim(),
    });

    if (data?.token) {
      setItem(LocalStorageKeys.accessToken, data.token);
      setItem(LocalStorageKeys.name, data.name);
      setItem(LocalStorageKeys.isAdmin, data.isAdmin);
      setItem(LocalStorageKeys.avatar, data.avatar);
      setItem(LocalStorageKeys.prevURL, '');
      setItem(LocalStorageKeys.id, data.id);
      window.location.href = redirectURL ?? '/admin/users';
    }
  };

  return (
    <Grid
      templateColumns={{ base: "auto", xl: "780px 1fr" }}
      backgroundImage={`url(${LoginBackground})`}
      backgroundPosition="-10% 20%"
    >
      <VStack
        p={{ base: "14px", md: "38px 44px" }}
        h="100vh"
        backgroundColor="dark"
        alignItems="left"
      >
        <Box width="full">
          {/* <Image h="36px" src={Logo} /> */}
          <Heading
            as="h1"
            size="md"
            textAlign="left"
            w="full"
            fontWeight={700}
            color="white"
          >
            TOEICAMP
          </Heading>
        </Box>
        <VStack
          flex={1}
          mx="auto"
          w={{ base: "full", md: "380px" }}
          justifyContent="center"
          spacing="20px"
        >
          <Heading
            as="h1"
            size="md"
            textAlign="left"
            w="full"
            fontWeight={700}
            color="white"
          >
            Sign In
          </Heading>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onLogin)}>
            <VStack spacing="14px">
              <TextField
                h="50px"
                placeholder="Email address"
                color="white"
                fontSize="sm"
                error={errors.email?.message}
                {...register("email", {
                  required: "The Email address field is required!",
                })}
              />
              <PasswordField
                h="50px"
                placeholder="Password"
                fontSize="sm"
                error={errors.password?.message}
                {...register("password", {
                  required: "The password field is required!",
                })}
                color="white"
                iconsProps={{
                  w: "18px",
                  h: "18px",
                }}
                buttonProps={{
                  mr: "10px",
                }}
              />
              <Button
                mt="14px"
                h="50px"
                type="submit"
                isLoading={isLoginLoading}
                colorScheme="gray"
                w="full"
              >
                Sign in
              </Button>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </Grid>
  );
};

export default AdminLogin;
