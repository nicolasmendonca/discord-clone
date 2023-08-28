import { initialProfile } from "src/lib/initial-profile"
import { db } from "src/lib/db"
import { redirect } from "next/navigation"
import { InitialModal } from "src/components/modals/initial-modal"

const SetupPage = async () => {
	const profile = await initialProfile()

	const server = await db.server.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})

	if (server) {
		return redirect(`/servers/${server.id}`)
	}

	return <InitialModal />
}

export default SetupPage
