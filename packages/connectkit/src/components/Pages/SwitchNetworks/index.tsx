import React from "react"

import { PageContent, ModalContent, ModalBody } from "../../Common/Modal/styles"
import ChainSelectList from "../../Common/ChainSelectList"
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi"

import useLocales from "../../../hooks/useLocales"

import Button from "../../Common/Button"
import { DisconnectIcon } from "../../../assets/icons"
import { isSafeConnector } from "../../../utils"
import { OrDivider } from "../../Common/Modal"

const SwitchNetworks: React.FC = () => {
	const { reset } = useConnect()
	const { disconnect } = useDisconnect()
	const { chain } = useNetwork()
	const { connector } = useAccount()

	const locales = useLocales({})

	const onDisconnect = () => {
		disconnect()
		reset()
	}

	return (
		<PageContent style={{ width: 278 }}>
			<ModalContent style={{ padding: 0, marginTop: -10 }}>
				{chain?.unsupported && (
					<ModalBody>
						{locales.warnings_chainUnsupported}{" "}
						{locales.warnings_chainUnsupportedResolve}
					</ModalBody>
				)}

				<div style={{ padding: "6px 8px" }}>
					<ChainSelectList variant="secondary" />
				</div>

				{chain?.unsupported && !isSafeConnector(connector?.id) && (
					<div style={{ paddingTop: 12 }}>
						<OrDivider />
						<Button
							icon={<DisconnectIcon />}
							variant="secondary"
							onClick={onDisconnect}
						>
							{locales.disconnect}
						</Button>
					</div>
				)}
			</ModalContent>
		</PageContent>
	)
}

export default SwitchNetworks
