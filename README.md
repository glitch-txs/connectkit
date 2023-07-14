## Install

#### npm

```sh
npm i ronin-connectkit ronin-connector wagmi viem
```

#### yarn

```sh
yarn add ronin-connectkit ronin-connector wagmi viem
```

#### pnpm

```sh
pnpm add ronin-connectkit ronin-connector wagmi viem
```

## Configuration

```tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { WagmiConfig, createConfig } from 'wagmi';
import { ConnectKitProvider, getDefaultConfig } from 'ronin-connectkit';
import { RoninConnector, saigon, ronin } from 'ronin-connector';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string

const config = createConfig(
  getDefaultConfig({
    appName: 'ConnectKit Next.js demo',
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemyId:  process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [saigon],
    connectors:[
      new RoninConnector({
        chains:[saigon],
        options:{
          projectId,
          metadata:{
            name: 'wagmi',
            description: 'my wagmi app',
            url: 'https://wagmi.sh',
            icons: ['https://wagmi.sh/icon.png'],
          },
        }
      })
    ]
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider debugMode>
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
```

### For Next.js

This should be on next.config.js file
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
```

## Documentation

You can find the full ConnectKit documentation in the Family docs [here](https://docs.family.co/connectkit).

## API Reference

You can find the full API Reference in the Family docs [here](https://docs.family.co/connectkit/api-reference).

### Running Examples Locally

Clone the ConnectKit project and install the necessary dependencies:

```sh
$ git clone https://github.com/glitch-txs/ronin-connectkit.git
$ cd connectkit
$ yarn install
```

and start the code bundler:

```sh
$ yarn dev:connectkit
```

and then simply select the example you'd like to run:

```sh
$ yarn dev:vite # Vite
$ yarn dev:nextjs # Next.js
$ yarn dev:cra # Create React App
```

## Contribute

Before starting on anything, please have a read through our [Contribution Guidelines](https://github.com/family/connectkit/blob/main/CONTRIBUTING.md).

## Twitter

Follow [@family](https://twitter.com/family) on Twitter for the latest updates on ConnectKit.

## License

See [LICENSE](https://github.com/family/connectkit/blob/main/LICENSE) for more information.
