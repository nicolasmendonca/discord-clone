"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { UploadDropzone } from "src/lib/uploadthing"
import "@uploadthing/react/styles.css"
import React from "react"

interface FileUploadProps {
	onChange: (url?: string) => void
	value: string
	endpoint: "messageFile" | "serverImage"
}

export const FileUpload: React.FC<FileUploadProps> = ({
	onChange,
	value,
	endpoint,
}) => {
	const fileType = value?.split(".").pop()

	if (value && fileType !== "pdf") {
		return (
			<div className="relative h-20 w-20">
				<Image fill src={value} alt="upload" className="rounded-full" />
				<button
					onClick={() => {
						onChange("")
					}}
					className="absolute right-0 top-0 z-10 rounded-full bg-rose-500 p-1 text-white shadow-sm"
					type="button"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		)
	}

	return (
		<div>
			<UploadDropzone
				endpoint={endpoint}
				onClientUploadComplete={(res) => {
					onChange(res?.[0].url)
				}}
				onUploadError={(error: Error) => {
					console.log(error)
				}}
			/>
		</div>
	)
}
