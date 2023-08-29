"use client"

import React from "react"
import { CreateServerModal } from "src/components/modals/create-server-modal"
import { InviteModal } from "src/components/modals/invite-modal"
import { EditServerModal } from "src/components/modals/edit-server-modal"

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
			<EditServerModal />
			<InviteModal />
		</>
	)
}
