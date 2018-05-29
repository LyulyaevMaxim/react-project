import React from 'react'
import PropTypes from 'prop-types'
import './paginations.scss'

Pagination.propTypes = {
	changeActivePage: PropTypes.func.isRequired,
	changePageSize: PropTypes.func.isRequired,
	totalPages: PropTypes.number,
	pageSize: PropTypes.number,
	page: PropTypes.number
}

function Pagination({ changeActivePage, changePageSize, pageSize, totalPages, page }) {
	return (
		<pagination-block>
			<PageSize {...{ changePageSize, pageSize }} />
			<PaginationPage {...{ changeActivePage, pageSize, totalPages, page }} />
		</pagination-block>
	)
}

PageSize.propTypes = {
	changePageSize: PropTypes.func.isRequired,
	pageSize: PropTypes.number
}

function PageSize({ changePageSize, pageSize }) {
	const options = [10, 20, 50, 100]
	return (
		<pagination-pagesize>
			<p>Показывать</p>
			<pagination-pagesize-buttons>
				{options.map(el => (
					<button
						onClick={() => changePageSize({ pageSize: el })}
						styleName={pageSize === el ? 'active' : ''}
						key={el}
					>
						{el}
					</button>
				))}
			</pagination-pagesize-buttons>
			<p>позиций</p>
		</pagination-pagesize>
	)
}

PaginationPage.propTypes = {
	changeActivePage: PropTypes.func.isRequired,
	totalPages: PropTypes.number,
	pageSize: PropTypes.number,
	page: PropTypes.number
}

function PaginationPage({ changeActivePage, pageSize, totalPages, page }) {
	const handleClick = event => changeActivePage({ page: Number(event.target.getAttribute('page')) })

	const paginationButtons = ({ page, totalPages }) => {
		const buttons = []
		if (totalPages < 5) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(
					<button
						onClick={handleClick}
						styleName={page === i ? 'active' : ''}
						page={i}
						key={`page-${i}`}
					>
						{i}
					</button>
				)
			}
			return buttons
		}

		buttons.push(
			<button
				onClick={handleClick}
				styleName={page === 1 ? 'active' : ''}
				page={1}
				key={`page-${1}`}
			>
				1
			</button>
		)
		switch (page) {
			case 2: {
				buttons.push(
					<button styleName="active" key={`page-${2}`}>
						{2}
					</button>
				)
				buttons.push(
					<button styleName="disable" key={`page-other-right`}>
						...
					</button>
				)
				break
			}

			case totalPages - 1: {
				buttons.push(
					<button styleName="disable" key={`page-other-left`}>
						...
					</button>
				)
				buttons.push(
					<button styleName="active" key={`page-${totalPages - 1}`}>
						{totalPages - 1}
					</button>
				)

				break
			}

			default: {
				if (page > 2 && page < totalPages - 1) {
					buttons.push(
						<button styleName="disable" key={`page-other-left`}>
							...
						</button>
					)

					buttons.push(
						<button styleName="active" key={`page-${page}`}>
							{page}
						</button>
					)

					buttons.push(
						<button styleName="disable" key={`page-other-right`}>
							...
						</button>
					)
				} else {
					buttons.push(
						<button styleName="disable" key={`page-other`}>
							...
						</button>
					)
				}
			}
		}

		buttons.push(
			<button
				onClick={handleClick}
				styleName={page === totalPages ? 'active' : ''}
				page={totalPages}
				key={`page-${totalPages}`}
			>
				{totalPages}
			</button>
		)

		return buttons
	}

	return (
		<pagination-page styleName={totalPages <= 1 ? 'disable' : ''}>
			<button
				styleName={`pagination-back ${page > 1 ? '' : 'disable'}`}
				onClick={handleClick}
				page={page - 1}
			>
				Назад
			</button>
			<pagination-page-buttons>{paginationButtons({ page, totalPages })}</pagination-page-buttons>
			<button
				styleName={`pagination-next ${page < totalPages ? '' : 'disable'}`}
				onClick={handleClick}
				page={page + 1}
			>
				Вперёд
			</button>
		</pagination-page>
	)
}

export default Pagination
