import React, { useEffect } from 'react';
import { 
  Box, FormControl, FormLabel, Input, FormErrorMessage, Button, Heading, Text, Flex
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useCorporationNumberValidation from '../hooks/useValidation';
import useSubmit from '../hooks/useSubmit';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
};

const phoneRegex = /^\+1[0-9]{10}$a/;

export const Form: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, touchedFields }, setError, clearErrors } = useForm<FormData>();
  const corporationNumber = watch("corporationNumber");
  const { isValid, message } = useCorporationNumberValidation(corporationNumber);
  const submitForm = useSubmit('https://vault-test-task-api.onrender.com/profile-details');

  useEffect(() => {
    if (touchedFields.corporationNumber) {
      if (!isValid) {
        setError("corporationNumber", { type: "manual", message: message || 'Invalid corporation number' });
      } else {
        clearErrors("corporationNumber");
      }
    }
  }, [corporationNumber, isValid, message, setError, clearErrors, touchedFields.corporationNumber]);

  const onFormSubmit = async (data: FormData) => {
    await submitForm(data);
  };

  return (
    <Box
      bg="white"
      p={8}
      rounded="lg"
      shadow="md"
      maxW="md"
      mx="auto"
      my={10}
    >
      <Box display="flex" justifyContent="space-between" mb={5}>
        <Heading as="h1" color="gray.800" size="lg">Onboarding Form</Heading>
        <Text fontSize="md" color="gray.600">Step 1 of 5</Text>
      </Box>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Flex direction={{ base: 'column', sm: 'row' }} gap={4}>
          <FormControl isInvalid={!!errors.firstName} flex={1}>
            <FormLabel htmlFor="firstName" color="gray.700">First Name</FormLabel>
            <Input id="firstName" color="gray.800" {...register("firstName", { required: "First Name is required", maxLength: 50 })} />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName} flex={1}>
            <FormLabel htmlFor="lastName" color="gray.700">Last Name</FormLabel>
            <Input id="lastName" color="gray.800" {...register("lastName", { required: "Last Name is required", maxLength: 50 })} />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
        </Flex>
        <FormControl isInvalid={!!errors.phone} mt={4}>
          <FormLabel htmlFor="phone" color="gray.700">Phone Number</FormLabel>
          <Input id="phone" color="gray.800" {...register("phone", { required: "Phone is required", pattern: { value: phoneRegex, message: "Invalid phone number. Format: +1XXXXXXXXXX" } })} />
          <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.corporationNumber} mt={4}>
          <FormLabel htmlFor="corporationNumber" color="gray.700">Corporation Number</FormLabel>
          <Input id="corporationNumber" color="gray.800" {...register("corporationNumber", { required: "Corporation Number is required" })} />
          <FormErrorMessage>{errors.corporationNumber?.message}</FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          type="submit"
          bg="black"
          color="white"
          width="full"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
