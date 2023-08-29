import { redirectToSignIn } from "@clerk/nextjs"
import { currentProfile } from "src/lib/current-profile"
import { db } from "src/lib/db"
import { ChannelType } from "@prisma/client"
import { redirect } from "next/navigation"
import { ServerHeader } from "./server-header"

interface ServerSidebarProps {
	serverId: string
}

export const ServerSidebar: React.FC<ServerSidebarProps> = async ({
	serverId,
}) => {
	const profile = await currentProfile()
	if (!profile) return redirectToSignIn()

	const server = await db.server.findUnique({
		where: {
			id: serverId,
		},
		include: {
			channels: {
				orderBy: {
					createdAt: "asc",
				},
			},
			members: {
				include: {
					profile: true,
				},
				orderBy: {
					role: "asc",
				},
			},
		},
	})

	const textChannels = server?.channels.filter(
		(channel) => channel.type === ChannelType.TEXT,
	)
	const audioChannels = server?.channels.filter(
		(channel) => channel.type === ChannelType.AUDIO,
	)
	const videoChannels = server?.channels.filter(
		(channel) => channel.type === ChannelType.VIDEO,
	)
	const members = server?.members.filter(
		(member) => member.profileId !== profile.id,
	)

	if (!server) {
		return redirect("/")
	}

	const role = server.members.find((member) => member.profileId === profile.id)
		?.role

	return (
		<div className="flex h-full w-full flex-col bg-[#f2f3f5] text-primary dark:bg-[#2b2d31]">
			<ServerHeader server={server} role={role} />
		</div>
	)
}
