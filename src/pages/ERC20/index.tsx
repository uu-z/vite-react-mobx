import React from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Container, FormControl, FormErrorMessage, FormLabel, Input, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { useStore } from '../../store/index';

class Schema {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsPositive()
  amount: string;

  @IsNotEmpty()
  receiver: string;
}

export const ERC20 = observer(() => {
  const { god } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Schema>({
    resolver: classValidatorResolver(Schema)
  });
  const store = useLocalStore(() => ({
    onSubmit(data: Schema) {
      console.log(data);
    }
  }));
  return (
    <Container maxW="md">
      <form onSubmit={handleSubmit(store.onSubmit)}>
        <FormControl isInvalid={!!Object.keys(errors).length} mt={20}>
          <FormLabel>Token Address</FormLabel>
          <Input {...register('address')} placeholder={god.currentNetwork.info.token.tokenExample} />
          <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
          <FormLabel>Token Amount</FormLabel>
          <Input {...register('amount')} placeholder="0" />
          <FormErrorMessage>{errors.amount && errors.amount.message}</FormErrorMessage>
          <FormLabel>Receiver Address</FormLabel>
          <Input {...register('receiver')} placeholder={god.currentNetwork.info.token.tokenExample} />
          <FormErrorMessage>{errors.receiver && errors.receiver.message}</FormErrorMessage>

          <Button type="submit" mt="4">
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
});
