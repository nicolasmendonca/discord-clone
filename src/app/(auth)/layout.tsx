const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="flex h-full items-center justify-center bg-stone-100">
			{children}
		</div>
	)
}

export default AuthLayout
