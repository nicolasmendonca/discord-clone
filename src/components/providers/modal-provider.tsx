"use client"

import React from "react"
import { CreateServerModal } from "src/components/modals/create-server-modal"

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = React.useState(false)

	React.useEffect(() => {
		setIsMounted(true)
	}, [setIsMounted])

	if (!isMounted) {
		return null
	}

	return (
		<>
			<CreateServerModal />
		</>
	)
}
