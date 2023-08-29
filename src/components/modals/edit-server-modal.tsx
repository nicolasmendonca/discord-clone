"use client"

import React from "react"
import * as z from "zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "src/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "src/components/ui/form"
import { Input } from "src/components/ui/input"
import { Button } from "src/components/ui/button"
import { FileUpload } from "src/components/file-upload"
import { useRouter } from "next/navigation"
import { useModal } from "../../hooks/use-modal-store"

const formSchema = z.object({
	name: z.string().min(1, {
		message: "Server name is required.",
	}),
	imageUrl: z.string().min(1, {
		message: "Server image is required.",
	}),
})

export const EditServerModal = () => {
	const modal = useModal()
	const router = useRouter()

	const isModalOpen = modal.isOpen && modal.type === "editServer"

	const { server } = modal.data
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			imageUrl: "",
		},
	})

	React.useEffect(() => {
		if (server) {
			form.setValue("name", server.name)
			form.setValue("imageUrl", server.imageUrl)
		}
	}, [server, form])

	const isLoading = form.formState.isSubmitting

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values)
		try {
			await axios.patch(`/api/servers/${server?.id}`, values)
			handleClose()
			router.refresh()
		} catch (e) {
			console.error(e)
		}
	}

	const handleClose = () => {
		form.reset()
		modal.onClose()
	}

	return (
		<Dialog open={isModalOpen} onOpenChange={handleClose}>
			<DialogContent className="overflow-hidden bg-white p-0 text-black">
				<DialogHeader className="px-6 pt-8">
					<DialogTitle className="text-center text-2xl">
						Customize your server
					</DialogTitle>
					<DialogDescription className="text-zing-500 text-center">
						Give your server a personality with a name and an image. You can
						always change it later
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<div className="space-y-8 px-6">
							<div className="flex items-center justify-center text-center">
								<FormField
									control={form.control}
									name="imageUrl"
									render={({ field }) => {
										return (
											<FormItem>
												<FormControl>
													<FileUpload
														endpoint="serverImage"
														value={field.value}
														onChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)
									}}
								/>
							</div>

							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-bold text-zing-500 text-xs uppercase dark:text-secondary/70">
											Server Name
										</FormLabel>
										<FormControl>
											<Input
												disabled={isLoading}
												className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
												placeholder="Enter server name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter className="bg-gray-100 px-6 py-4">
							<Button disabled={isLoading} variant="primary" type="submit">
								Save
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
