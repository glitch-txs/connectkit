/**
 *
 * TODO:
 * Move this into a structure to allow usage of WAGMI
 * or keep this file isolated for the other useful config data
 *
 */

import { ReactNode } from 'react';
import Logos from './../assets/logos';

let supportedConnectors: {
  id: string;
  name?: string;
  shortName?: string;
  logos: {
    default: ReactNode;
    transparent?: ReactNode;
    connectorButton?: ReactNode;
    qrCode?: ReactNode;
    appIcon?: ReactNode;
    mobile?: ReactNode;
  };
  logoBackground?: string;
  scannable?: boolean;
  extensions?: { [key: string]: string };
  appUrls?: { [key: string]: string };
  extensionIsInstalled?: () => any;
  defaultConnect?: () => any;
}[] = [];

if (typeof window != 'undefined') {
  const { ronin } = window;

  interface IDictionary {
    [index: string]: string;
  }

  supportedConnectors = [
    {
      id: 'roninWallet',
      name: 'Ronin Wallet',
      shortName: 'Ronin',
      logos: {
        default: <Logos.WalletConnect />,
        mobile: <Logos.WalletConnect background />,
        transparent: <Logos.WalletConnect background={false} />,
        appIcon: <Logos.WalletConnect background={false} />,
        connectorButton: <Logos.WalletConnect background={true} />,
        qrCode: <Logos.WalletConnect background={true} />,
      },
      logoBackground: 'var(--ck-brand-coinbaseWallet)',
      scannable: true,
      //defaultConnect: () => {},
      extensions: {
        chrome: 'https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec',
        firefox: 'https://addons.mozilla.org/es/firefox/addon/ronin-wallet/',
        edge: 'https://microsoftedge.microsoft.com/addons/detail/ronin-wallet/kjmoohlgokccodicjjfebfomlbljgfhk'
      } as IDictionary,
      appUrls: {
        download: 'https://wallet.roninchain.com/',
        website: 'https://wallet.roninchain.com/',
        android: 'https://play.google.com/store/apps/details?id=com.skymavis.genesis',
        ios: 'https://apps.apple.com/us/app/ronin-wallet/id1592675001',
      } as IDictionary,
      extensionIsInstalled: () => {
        return ronin
      },
    }
  ];
}

export default supportedConnectors;
