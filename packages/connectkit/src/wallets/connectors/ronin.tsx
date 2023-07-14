import { WalletProps } from "../wallet"

import { isMobile, isRonin } from "../../utils"
import { Ronin } from "../../assets/logos"

export const roninWallet = (): WalletProps => {
	const isInstalled = isRonin()
	const shouldUseWalletConnect = isMobile() && !isInstalled

	return {
		id: "roninWallet",
		name: "Ronin Wallet",
		shortName: "Ronin",
		logos: {
			default: <Ronin />,
			mobile: <Ronin background />,
			transparent: <Ronin background={false} />,
			appIcon: <Ronin background={false} />,
			connectorButton: <Ronin background={true} />,
			qrCode: <Ronin background={true} />,
		},
		logoBackground: "var(--ck-brand-coinbaseWallet)",
		scannable: true,
		installed: Boolean(!shouldUseWalletConnect ? isInstalled : false),
		downloadUrls: {
			download: "https://wallet.roninchain.com/",
			website: "https://wallet.roninchain.com/",
			android:
				"https://play.google.com/store/apps/details?id=com.skymavis.genesis",
			ios: "https://apps.apple.com/us/app/ronin-wallet/id1592675001",
			chrome:
				"https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec",
			firefox: "https://addons.mozilla.org/es/firefox/addon/ronin-wallet/",
			edge: "https://microsoftedge.microsoft.com/addons/detail/ronin-wallet/kjmoohlgokccodicjjfebfomlbljgfhk",
		},
		createUri: (uri: string) => {
			console.log(uri)
			return `https://wallet.roninchain.com/auth-connect?uri=${encodeURIComponent(
				uri,
			)}`
		},
	}
}
