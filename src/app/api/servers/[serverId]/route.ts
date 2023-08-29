import { NextResponse } from "next/server"
import { currentProfile } from "src/lib/current-profile"
import { db } from "src/lib/db"

export async function PATCH(
	req: Request,
	{ params }: { params: { serverId: string } },
) {
	try {
		const profile = await currentProfile()
		const requestData = await req.json()
		if (!profile) {
			return new NextResponse("Unauthorized", { status: 401 })
		}

		const server = await db.server.update({
			where: {
				id: params.serverId,
				profileId: profile.id,
			},
			data: requestData,
		})

		if (!server) {
			return new NextResponse("Not found", { status: 404 })
		}

		return NextResponse.json(server)
	} catch (e) {
		console.log(e)
		return new NextResponse("Internal error", { status: 500 })
	}
}
