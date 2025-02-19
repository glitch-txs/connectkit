import { useState, useEffect } from "react"

import { Connector, useAccount } from "wagmi"
import { useContext } from "../../components/ConnectKit"
import { useConnect } from "../useConnect"
import { useWalletConnectConnector } from "./../useConnectors"

type Props = {
	enabled?: boolean
}

export function useWalletConnectUri(
	{ enabled }: Props = {
		enabled: true,
	},
) {
	const { log } = useContext()

	const [uri, setUri] = useState<string | undefined>(undefined)

	const connector: Connector = useWalletConnectConnector()

	const { isConnected } = useAccount()
	const { connectAsync } = useConnect()

	useEffect(() => {
		if (!enabled) return

		async function handleMessage({ type, data }: any) {
			log("WC Message", type, data)
			if (type === "display_uri") {
				setUri(data.uri)
			}
		}
		async function handleChange(e: any) {
			log("WC Change", e)
		}
		async function handleDisconnect() {
			log("WC Disconnect")
		}
		async function handleConnect() {
			log("WC Connect")
		}
		async function handleError(e: any) {
			log("WC Error", e)
		}

		async function connectWallet(connector: Connector) {
			const result = await connectAsync({ connector })
			if (result) return result
			return false
		}

		async function connectWalletConnect(connector: Connector) {
			try {
				await connectWallet(connector)
			} catch (error: any) {
				log("catch error")
				log(error)
				if (error.code) {
					switch (error.code) {
						case 4001:
							log("error.code - User rejected")
							connectWalletConnect(connector) // Regenerate QR code
							break
						default:
							log("error.code - Unknown Error")
							break
					}
				} else {
					// Sometimes the error doesn't respond with a code
					log("WalletConnect cannot connect.", error)
				}
			}
		}

		if (!connector || uri) return
		if (connector && !isConnected) {
			connectWalletConnect(connector)
			log("add wc listeners")
			connector.on("message", handleMessage)
			connector.on("change", handleChange)
			connector.on("connect", handleConnect)
			connector.on("disconnect", handleDisconnect)
			connector.on("error", handleError)
			return () => {
				log("remove wc listeners")
				connector.off("message", handleMessage)
				connector.off("change", handleChange)
				connector.off("connect", handleConnect)
				connector.off("disconnect", handleDisconnect)
				connector.off("error", handleError)
			}
		}
	}, [enabled, connector, isConnected])

	return {
		uri,
	}
}
