import React from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
};

const phoneRegex = /^\+1[0-9]{10}$/;

export const OnboardingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onFormSubmit = async (data: FormData) => {
    console.log(data); 
  };

  const validateCorporationNumber = async (value: string) => {
    if (value.length !== 9) {
      return 'Corporation number must be 9 characters';
    }
    return true;
  };

  return (
    <VStack spacing={4} as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" {...register("firstName", { required: "First Name is required", maxLength: 50 })} />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input id="lastName" {...register("lastName", { required: "Last Name is required", maxLength: 50 })} />
        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.phone}>
        <FormLabel htmlFor="phone">Phone Number</FormLabel>
        <Input id="phone" {...register("phone", { required: "Phone is required", pattern: { value: phoneRegex, message: "Invalid Canadian phone number. Format: +1XXXXXXXXXX" } })} />
        <FormErrorMessage>{errors.phone && errors.phone.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.corporationNumber}>
        <FormLabel htmlFor="corporationNumber">Corporation Number</FormLabel>
        <Input id="corporationNumber" {...register("corporationNumber", { required: "Corporation Number is required", validate: validateCorporationNumber })} />
        <FormErrorMessage>{errors.corporationNumber && errors.corporationNumber.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="blue">Submit</Button>
    </VStack>
  );
};
