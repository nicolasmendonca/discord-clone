import { MemberRole } from "@prisma/client"
import { NextResponse } from "next/server"
import { currentProfile } from "src/lib/current-profile"
import { db } from "src/lib/db"

export async function POST(req: Request) {
	try {
		const [profile, { name, imageUrl }] = await Promise.all([
			currentProfile(),
			req.json(),
		])
		if (!profile) return new NextResponse("Unauthorized", { status: 401 })
		const server = await db.server.create({
			data: {
				name,
				imageUrl,
				profile: { connect: { id: profile.id } },
				inviteCode: crypto.randomUUID(),
				channels: {
					create: [{ name: "general", profileId: profile.id }],
				},
				members: {
					create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
				},
			},
		})

		return NextResponse.json(server)
	} catch (e) {
		console.error(e)
		return new NextResponse("Internal error", { status: 500 })
	}
}
