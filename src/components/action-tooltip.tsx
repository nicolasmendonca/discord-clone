"use client"

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip"

import React from "react"

interface IActionTooltipProps {
	label: string
	children: React.ReactNode
	side?: "left" | "right" | "top" | "bottom"
	align?: "start" | "center" | "end"
}

export const ActionTooltip: React.FC<IActionTooltipProps> = ({
	label,
	children,
	side,
	align,
}) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={50}>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align}>
					<p className="text-sm font-semibold capitalize">
						{label.toLowerCase()}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
