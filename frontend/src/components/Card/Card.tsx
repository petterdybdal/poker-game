import { toPokerSymbol } from '../../utils/poker';
import styles from './Card.module.css';

type CardProps = {
  card: string;
};

export const Card = ({ card }: CardProps) => {
  const suit = card[1];
  const rank = card[0];

  const suitColor = suit === 'k' || suit === 's' ? 'black' : 'red';

  return (
    <div className={styles.outerCard}>
      <div className={styles.rank}>
        {rank === 't' ? 10 : rank.toUpperCase()}
      </div>
      <div
        style={{
          color: suitColor,
        }}
        className={styles.suit}
      >
        {toPokerSymbol(suit)}
      </div>
    </div>
  );
};
