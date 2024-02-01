import React, { useEffect } from 'react';
import { FormControl, FormLabel, Input, FormErrorMessage, Button, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useCorporationNumberValidation from '../hooks/useValidation';
import useSubmit from '../hooks/useSubmit';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  corporationNumber: string;
};

const phoneRegex = /^\+1[0-9]{10}$/;

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
    <VStack spacing={4} as="form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormControl isInvalid={!!errors.firstName}>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <Input id="firstName" {...register("firstName", { required: "First Name is required", maxLength: 50 })} />
        <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.lastName}>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <Input id="lastName" {...register("lastName", { required: "Last Name is required", maxLength: 50 })} />
        <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.phone}>
        <FormLabel htmlFor="phone">Phone Number</FormLabel>
        <Input id="phone" {...register("phone", { required: "Phone is required", pattern: { value: phoneRegex, message: "Invalid Canadian phone number. Format: +1XXXXXXXXXX" } })} />
        <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.corporationNumber}>
        <FormLabel htmlFor="corporationNumber">Corporation Number</FormLabel>
        <Input id="corporationNumber" {...register("corporationNumber", { required: "Corporation Number is required" })} />
        {touchedFields.corporationNumber && <FormErrorMessage>{errors.corporationNumber?.message}</FormErrorMessage>}
      </FormControl>
      <Button type="submit" colorScheme="blue">Submit</Button>
    </VStack>
  );
};
