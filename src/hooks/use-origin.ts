import React from "react"

export const useOrigin = () => {
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [setMounted])

	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: ""

	if (!mounted) {
		return ""
	}

	return origin
}
