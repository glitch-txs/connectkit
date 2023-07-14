import { ReactNode } from "react"
import Logos from "./../assets/chains"

type Chain = { id: number; name: string; logo: ReactNode }
const supportedChains: Chain[] = [
	{
		id: 2020,
		name: "Ronin Network",
		logo: <Logos.Ethereum />,
	},
	{
		id: 2021,
		name: "Saigon Testnet",
		logo: <Logos.Ethereum testnet />,
	},
]

export default supportedChains
