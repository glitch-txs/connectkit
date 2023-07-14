import { ReactNode } from "react"
import { Ronin } from "./../assets/chains"

type Chain = { id: number; name: string; logo: ReactNode }
const supportedChains: Chain[] = [
	{
		id: 2020,
		name: "Ronin Network",
		logo: <Ronin />,
	},
	{
		id: 2021,
		name: "Saigon Testnet",
		logo: <Ronin testnet />,
	},
]

export default supportedChains
