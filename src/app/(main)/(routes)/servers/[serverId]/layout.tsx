import React from "react"
import { redirect } from "next/navigation"
import { redirectToSignIn } from "@clerk/nextjs"
import { db } from "src/lib/db"
import { currentProfile } from "src/lib/current-profile"
import { ServerSidebar } from "src/components/server/server-sidebar"

const ServerIdLayout: React.FC<{
	children: React.ReactNode
	params: {
		serverId: string
	}
}> = async ({ children, params }) => {
	const profile = await currentProfile()

	if (!profile) return redirectToSignIn()

	const server = await db.server.findUnique({
		where: {
			id: params.serverId,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	if (!server) {
		return redirect("/")
	}

	return (
		<div className="h-full">
			<div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
				<ServerSidebar serverId={params.serverId} />
			</div>

			<main className="h-full md:pl-60">{children}</main>
		</div>
	)
}

export default ServerIdLayout
