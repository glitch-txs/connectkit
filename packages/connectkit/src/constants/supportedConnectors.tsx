import { ReactNode } from "react"
import { Ronin } from "./../assets/logos"

let supportedConnectors: {
	id: string
	name?: string
	shortName?: string
	logos: {
		default: ReactNode
		transparent?: ReactNode
		connectorButton?: ReactNode
		qrCode?: ReactNode
		appIcon?: ReactNode
		mobile?: ReactNode
	}
	logoBackground?: string
	scannable?: boolean
	extensions?: { [key: string]: string }
	appUrls?: { [key: string]: string }
	extensionIsInstalled?: () => boolean
	defaultConnect: boolean
}[] = []

if (typeof window !== "undefined") {
	const { ronin } = window

	interface IDictionary {
		[index: string]: string
	}

	supportedConnectors = [
		{
			id: "roninWallet",
			name: "Ronin Wallet",
			shortName: "Ronin",
			logos: {
				default: <Ronin />,
				mobile: <Ronin background />,
				transparent: <Ronin background={false} />,
				appIcon: <Ronin background={false} />,
				connectorButton: <Ronin background={true} />,
				qrCode: <Ronin background={true} style={{ transform: "scale(0.8)" }} />,
			},
			logoBackground: "#004de5",
			scannable: true,
			//defaultConnect: () => {},
			extensions: {
				chrome:
					"https://chrome.google.com/webstore/detail/ronin-wallet/fnjhmkhhmkbjkkabndcnnogagogbneec",
				firefox: "https://addons.mozilla.org/es/firefox/addon/ronin-wallet/",
				edge: "https://microsoftedge.microsoft.com/addons/detail/ronin-wallet/kjmoohlgokccodicjjfebfomlbljgfhk",
			} as IDictionary,
			appUrls: {
				download: "https://wallet.roninchain.com/",
				website: "https://wallet.roninchain.com/",
				android:
					"https://play.google.com/store/apps/details?id=com.skymavis.genesis",
				ios: "https://apps.apple.com/us/app/ronin-wallet/id1592675001",
			} as IDictionary,
			extensionIsInstalled: () => {
				return Boolean(ronin)
			},
			defaultConnect: false,
		},
	]
}

export default supportedConnectors
