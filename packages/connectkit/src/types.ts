import { EIP1193Provider } from "viem"
import { Languages as Lang } from "./localizations"
export type Languages = Lang

export type CSSProps = {
	[key: string]:
		| string
		| {
				[key: string]: string
		  }
	$customTheme: {
		[key: string]: string
	}
}

export type Theme =
	| "auto"
	| "web95"
	| "retro"
	| "soft"
	| "midnight"
	| "minimal"
	| "rounded"
	| "nouns"
export type Mode = "light" | "dark" | "auto"
export type CustomTheme = unknown // TODO: define type

export type All = {
	theme?: Theme
	mode?: Mode
	customTheme?: CustomTheme
	lang?: Languages
}

export type { ConnectKitOptions } from "./components/ConnectKit"
export type { CustomAvatarProps } from "./components/Common/Avatar"

declare global {
	interface Window {
		ronin?: {
			provider: EIP1193Provider
			roninEvent: EventTarget
		}
	}
}
