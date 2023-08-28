import React from "react"
import { currentProfile } from "../../lib/current-profile"
import { redirect } from "next/navigation"
import { db } from "../../lib/db"
import { NavigationAction } from "./navigation-action"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"
import { NavigationItem } from "./navigation-item"
import { ThemeToggle } from "../theme-toggle"
import { UserButton } from "@clerk/nextjs"

interface INavigationSidebarProps {}

export const NavigationSidebar: React.FC<
	INavigationSidebarProps
> = async () => {
	const profile = await currentProfile()

	if (!profile) return redirect("/")

	const servers = await db.server.findMany({
		where: {
			members: {
				some: {
					profileId: profile.id,
				},
			},
		},
	})
	return (
		<div className="flex h-full w-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1e1f22]">
			<NavigationAction />
			<Separator className="mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />
			<ScrollArea className="w-full flex-1">
				<div className="flex flex-col items-center space-y-4">
					{servers.map((server) => (
						<div className="mb-4" key={server.id}>
							<NavigationItem
								id={server.id}
								name={server.name}
								imageUrl={server.imageUrl}
							/>
						</div>
					))}
				</div>
			</ScrollArea>
			<div className="mt-auto flex flex-col items-center gap-y-4 pb-3">
				<ThemeToggle />
				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: "h-[48px] w-[48px]",
						},
					}}
				/>
			</div>
		</div>
	)
}
