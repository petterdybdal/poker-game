import { useQuery } from '@tanstack/react-query';
import { createHand } from '../../api/pokerApi';
import { Card } from '../Card/Card';
import { HandResponse } from '../../api/types';
import styles from './CreateHand.module.css';

export const CreateHand = () => {
  const { isLoading, error, data, refetch } = useQuery<HandResponse>({
    queryKey: ['createHand'],
    queryFn: createHand,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {data?.hand &&
          data.hand.map((card, index) => <Card key={index} card={card} />)}
      </div>
      <h2>Rank: {data?.rank}</h2>
      <button className={styles.button} onClick={() => refetch()}>
        Generate new hand
      </button>
    </div>
  );
};
