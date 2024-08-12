import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input, Button } from '@chakra-ui/react';

const Home = () => {
  const [address, setAddress] = useState<string>('');
  const queryAction = useQuery({
    queryKey: [address],
    enabled: false,
    async queryFn({ queryKey }) {
      const [address] = queryKey;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: '',
        },
      };
      const res = await fetch(
        `https://api.zerion.io/v1/wallets/${address}/portfolio?currency=usd`,
        options,
      );
      return res.json();
    },
  });

  const search = () => {
    console.log('address', address);
    queryAction.refetch();
  };

  return (
    <div>
      <Input
        placeholder="Please enter the address"
        onChange={(event) => setAddress(event.target.value)}
      />
      <Button onClick={search}>查询</Button>
      <div>{JSON.stringify(queryAction.data)}</div>
    </div>
  );
};
export default Home;
