export const toPokerSymbol = (suit: string) => {
  switch (suit) {
    case 'k':
      return '♠';
    case 'r':
      return '♦';
    case 'h':
      return '♥';
    case 's':
      return '♣';
    default:
      return '';
  }
};
