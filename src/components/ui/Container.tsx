interface Props {
	children: any
}

const Container: React.FC<Props> = ({ children }) => {
	return <div className="max-w-7xl w-full">{children}</div>
}

export default Container
