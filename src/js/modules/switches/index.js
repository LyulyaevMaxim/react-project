import React, { Component, Fragment } from 'react'
import '~css/switches/index.scss'

class Switches extends Component {
	state = {
		activeIndex: 0
	}

	handleSwitch = ({ index }) => this.setState({ activeIndex: index })

	componentDidMount() {
		const all = this.equipmentBlocks.querySelectorAll('switchable-block')
		let maxHeight = 0
		all.forEach(({ scrollHeight }) => {
			if (scrollHeight > maxHeight) maxHeight = scrollHeight
		})
		this.equipmentBlocks.style.minHeight = `${maxHeight}px`
	}

	render() {
		const { data, title, className } = this.props
		const { activeIndex } = this.state
		const switches = data.map(({ title }, index) => {
			const handleClick = () => this.handleSwitch({ index })
			return (
				<label
					htmlFor={`equipment-${index}`}
					className={activeIndex === index ? 'active' : ''}
					onClick={handleClick}
					key={`equipment-${index}`}
				>
					{title}
				</label>
			)
		})

		return (
			<switches-container class={className}>
				{!!title.length && <h2 className="switches-container-title">{title}</h2>}
				<switches-content>
					<aside>{switches}</aside>
					<main ref={e => (this.equipmentBlocks = e)}>
						{data.map(({ content }, index) => {
							return (
								<Fragment key={`equipment-${index}`}>
									{switches[index]}
									<input
										type="radio"
										name="equipment"
										id={`equipment-${index}`}
										defaultChecked={!index}
									/>
									<switchable-block>{content}</switchable-block>
								</Fragment>
							)
						})}
					</main>
				</switches-content>
			</switches-container>
		)
	}
}

export default Switches
