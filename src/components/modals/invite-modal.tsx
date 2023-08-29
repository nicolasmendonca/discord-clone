"use client"

import React from "react"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "src/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useModal } from "../../hooks/use-modal-store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useOrigin } from "../../hooks/use-origin"
import axios from "axios"

let timeout: NodeJS.Timeout

export const InviteModal = () => {
	const modal = useModal()
	const origin = useOrigin()

	const isModalOpen = modal.isOpen && modal.type === "invite"
	const { server } = modal.data

	const [copied, setCopied] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)

	const inviteUrl = `${origin}/invite/${server?.inviteCode}`

	const onCopy = () => {
		if (timeout) {
			clearTimeout(timeout)
		}
		navigator.clipboard.writeText(inviteUrl)
		setCopied(true)

		timeout = setTimeout(() => {
			setCopied(false)
		}, 2000)
	}

	const onNew = async () => {
		try {
			setIsLoading(true)
			const response = await axios.patch(
				`/api/servers/${server?.id}/invite-code`,
			)
			modal.onOpen("invite", { server: response.data })
		} catch (e) {
			console.log(e)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={modal.onClose}>
			<DialogContent className="overflow-hidden bg-white p-0 text-black">
				<DialogHeader className="px-6 pt-8">
					<DialogTitle className="text-center text-2xl">
						Invite Friends
					</DialogTitle>
				</DialogHeader>
				<div className="p-6">
					<Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
						Server invite link
					</Label>
					<div className="mt-2 flex items-center gap-x-2">
						<Input
							className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
							value={inviteUrl}
							disabled={isLoading}
						/>
						<Button size="icon" disabled={isLoading} onClick={onCopy}>
							{copied ? (
								<Check className="ml-2 h-4 w-4" />
							) : (
								<Copy className="h-4 w-4" />
							)}
						</Button>
					</div>
					<Button
						disabled={isLoading}
						variant="link"
						size="sm"
						className="mt-4 text-xs text-zinc-500"
						onClick={onNew}
					>
						Generate a new link
						<RefreshCw className="ml-2 h-4 w-4" />
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
