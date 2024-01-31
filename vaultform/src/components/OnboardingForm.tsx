import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
};

export const OnboardingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data); // Placeholder
  };

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" {...register("firstName", { required: "First Name is required", maxLength: 50 })} />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>

      {/* Repeat for lastName, phone, and corporationNumber with validation */}

      <Button type="submit" colorScheme="blue">Submit</Button>
    </VStack>
  );
};
