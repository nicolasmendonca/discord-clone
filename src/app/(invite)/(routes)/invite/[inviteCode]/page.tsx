import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { currentProfile } from "src/lib/current-profile"
import { db } from "src/lib/db"

interface InviteCodePageProps {
	params: {
		inviteCode: string
	}
}

const InviteCodePage: React.FC<InviteCodePageProps> = async ({ params }) => {
	const profile = await currentProfile()

	if (!profile) {
		return redirectToSignIn()
	}

	if (!params.inviteCode) {
		return redirect("/")
	}

	const existingServer = await db.server.findFirst({
		where: {
			inviteCode: params.inviteCode,
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	if (existingServer) {
		return redirect(`/servers/${existingServer.id}`)
	}

	const server = await db.server.update({
		where: {
			inviteCode: params.inviteCode,
		},
		data: {
			members: {
				create: [
					{
						profileId: profile.id,
					},
				],
			},
		},
	})

	if (server) {
		redirect(`/server/${server.id}`)
	}

	return <p>The server with the given invite code does not exist :(</p>
}

export default InviteCodePage
