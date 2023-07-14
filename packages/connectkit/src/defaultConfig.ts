import {
  Connector,
  configureChains,
  ChainProviderFn,
  PublicClient,
  WebSocketPublicClient,
} from 'wagmi';
import { Chain } from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

let globalAppName: string;
let globalAppIcon: string;

export const getAppName = () => globalAppName;
export const getAppIcon = () => globalAppIcon;

type DefaultConfigProps = {
  appName: string;
  appIcon?: string;
  appDescription?: string;
  appUrl?: string;
  autoConnect?: boolean;
  alchemyId?: string;
  infuraId?: string;
  chains: Chain[];
  connectors: any;
  publicClient?: any;
  webSocketPublicClient?: any;
  enableWebSocketPublicClient?: boolean;
  stallTimeout?: number;
};

type ConnectKitClientProps = {
  autoConnect?: boolean;
  connectors: Connector[];
  publicClient: PublicClient;
  webSocketPublicClient?: WebSocketPublicClient;
};

const defaultConfig = ({
  autoConnect = true,
  appName = 'ConnectKit',
  appIcon,
  chains,
  alchemyId,
  infuraId,
  connectors,
  publicClient,
  stallTimeout,
  webSocketPublicClient,
  enableWebSocketPublicClient,
}: DefaultConfigProps) => {
  globalAppName = appName;
  if (appIcon) globalAppIcon = appIcon;

  const providers: ChainProviderFn[] = [];
  if (alchemyId) {
    providers.push(alchemyProvider({ apiKey: alchemyId }));
  }
  if (infuraId) {
    providers.push(infuraProvider({ apiKey: infuraId }));
  }
  providers.push(
    jsonRpcProvider({
      rpc: (c) => {
        return { http: c.rpcUrls.default.http[0] };
      },
    })
  );
  providers.push(publicProvider());

  const {
    publicClient: configuredPublicClient,
    webSocketPublicClient: configuredWebSocketPublicClient,
  } = configureChains(chains, providers, { stallTimeout });

  const connectKitClient: ConnectKitClientProps = {
    autoConnect,
    connectors,
    publicClient: publicClient ?? configuredPublicClient,
    webSocketPublicClient: enableWebSocketPublicClient // Removed by default, breaks if used in Next.js – "unhandledRejection: Error: could not detect network"
      ? webSocketPublicClient ?? configuredWebSocketPublicClient
      : undefined,
  };

  return { ...connectKitClient };
};

export default defaultConfig;
