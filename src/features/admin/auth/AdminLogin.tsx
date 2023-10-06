import { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="10vh"
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb={4}>
        Login
      </Heading>
      <FormControl id="email" isRequired>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
        />
      </FormControl>
      <FormControl id="password" mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </FormControl>
      <Button
        mt={4}
        colorScheme="teal"
        variant="outline"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
}

export default AdminLogin;
