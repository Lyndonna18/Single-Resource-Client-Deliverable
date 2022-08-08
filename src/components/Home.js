import BlogIndex from "./blogs/BlogIndex"

const Home = (props) => {
	const { msgAlert } = props
	console.log('props in home', props)


	return (
		<>
			<h2
				style={{
					margin: '10px',
					padding: '5px',
					background: '#050d17ff',
					textAlign: 'center',
					fontFamily: 'Cinzel, serif',
					color: '#f4a460ff'
				}}
			>
				Massive Multiblogger Online
			</h2>
			<BlogIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home