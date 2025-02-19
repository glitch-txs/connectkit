import { useAccount } from "wagmi"

export type useConnectCallbackProps = {
	onConnect?: ({
		address,
		connectorId,
	}: {
		address?: string
		connectorId?: string
	}) => void
	onDisconnect?: () => void
}

export const useConnectCallback = ({
	onConnect,
	onDisconnect,
}: useConnectCallbackProps) => {
	useAccount({
		onConnect: ({ address, connector, isReconnected }) => {
			if (!isReconnected) {
				onConnect?.({
					address: address,
					connectorId: connector?.id,
				})
			}
		},
		onDisconnect: () => onDisconnect?.(),
	})
}
