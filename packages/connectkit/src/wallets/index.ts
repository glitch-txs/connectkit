import { roninWallet } from './connectors/ronin';

export const getWallets = () => {
  return [roninWallet()];
};
