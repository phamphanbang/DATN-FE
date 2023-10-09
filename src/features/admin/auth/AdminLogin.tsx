// import { useState } from 'react';
import {
  Box,
  Heading,
  // FormControl,
  // FormLabel,
  // Input,
  // Button,
  // Image,
  VStack,
  // Heading,
  Button,
  Grid,
  // Icon,
} from '@chakra-ui/react';
import { PasswordField } from 'common/components/PasswordField';
import { TextField } from 'common/components/TextField';
import LoginBackground from 'assets/images/Admin_login_background.jfif';

function AdminLogin() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = () => {
  //   console.log('Email:', email);
  //   console.log('Password:', password);
  // };

  return (
    // <Box
    //   maxW="400px"
    //   mx="auto"
    //   mt="10vh"
    //   p={4}
    //   borderWidth="1px"
    //   borderRadius="lg"
    //   boxShadow="lg"
    // >
    //   <Heading as="h2" size="lg" mb={4} textAlign="center">
    //     TOEICAMP
    //   </Heading>
    //   <FormControl id="email" isRequired>
    //     <FormLabel>Email address</FormLabel>
    //     <Input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       placeholder="Email address"
    //     />
    //   </FormControl>
    //   <FormControl id="password" mt={4} isRequired>
    //     <FormLabel>Password</FormLabel>
    //     <Input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       placeholder="Password"
    //     />
    //   </FormControl>
    //   <Button
    //     mt={4}
    //     colorScheme="teal"
    //     variant="outline"
    //     onClick={handleLogin}
    //   >
    //     Login
    //   </Button>
    // </Box>
    <Grid
      templateColumns={{ base: 'auto', xl: '780px 1fr' }}
      backgroundImage={`url(${LoginBackground})`}
      backgroundPosition="-10% 20%"
    >
      <VStack
        p={{ base: '14px', md: '38px 44px' }}
        h="100vh"
        backgroundColor="dark"
        alignItems="left"
      >
        <Box width="full">
          {/* <Image h="36px" src={Logo} /> */}
          <Heading as="h1" size="md" textAlign="left" w="full" fontWeight={700} color="white">
            TOEICAMP
          </Heading>
        </Box>
        <VStack
          flex={1}
          mx="auto"
          w={{ base: 'full', md: '380px' }}
          justifyContent="center"
          spacing="20px"
        >
          <Heading as="h1" size="md" textAlign="left" w="full" fontWeight={700} color="white">
            Sign In
          </Heading>
          <form style={{ width: '100%' }}
            // onSubmit={handleSubmit(onLogin)}
          >
            <VStack spacing="14px">
              <TextField
                h="50px"
                placeholder="Username or email address"
                color="white"
                fontSize="sm"
                // error={errors.userNameOrEmailAddress?.message}
                // {...register('userNameOrEmailAddress', {
                //   required: 'The Username or email address field is required!',
                // })}
              />
              <PasswordField
                h="50px"
                placeholder="Password"
                fontSize="sm"
                // error={errors.password?.message}
                // {...register('password', {
                //   required: 'The password field is required!',
                // })}
                color="white"
                iconsProps={{
                  w: '18px',
                  h: '18px',
                }}
                buttonProps={{
                  mr: '10px',
                }}
              />
              <Button
                mt="14px"
                h="50px"
                type="submit"
                // isLoading={isLoginLoading}
                colorScheme="gray"
                w="full"
              >
                Sign in
              </Button>
            </VStack>
          </form>
          {/* <Button
            // isLoading={isLoginExternalLoading}
            // onClick={handleLogin}
            w="full"
            h="50px"
            colorScheme="gray"
          >
            <Icon as={FcGoogle} mr="16px" filter="" fontSize="24px" />
            Sign in with Google
          </Button> */}
        </VStack>
      </VStack>
    </Grid>
  );
}

export default AdminLogin;
