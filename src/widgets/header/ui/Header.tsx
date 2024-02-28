import React, { useState } from 'react'
import './index.sass'
import { SearchBar } from 'entities/search'
import { Link } from 'react-router-dom'
import burger from 'assets/burger.svg'

export const Header = () => {
	const [showBurger, setShowBurger] = useState<boolean>(false)
	return (
		<div className="header">
			<div className="header-logo">
				<a href="/" className="reverse">
					book
				</a>
				<a href="/" className="reverse-letter">
					k
				</a>
			</div>
			<div className="header-search">
				<SearchBar />
			</div>
			<div className="header-nav">
				{/* <a href='/'>Main</a> */}
				<Link to={'/books'}>Books</Link>
				<Link to={'/authors'}>Authors</Link>
				<Link to={'/auth'}>Auth</Link>
				<Link to={'/cart'}>Cart</Link>
				{/* <Link to={'/favorites'}>Favorites</Link> */}
				<Link to={'/orders'}>Orders</Link>
			</div>
			<div className="header-nav__burger">
				<img
					onClick={() => setShowBurger((prev) => !prev)}
					src={burger}
					style={{ fill: '#fff' }}
					alt="burger"
				/>
				{showBurger && (
					<div className="header-nav__burger_open">
						<Link to={'/books'}>Books</Link>
						<Link to={'/authors'}>Authors</Link>
						<Link to={'/auth'}>Auth</Link>
						<Link to={'/cart'}>Cart</Link>
						{/* <Link to={'/favorites'}>Favorites</Link>{' '} */}
						<Link to={'/orders'}>Orders</Link>
					</div>
				)}
			</div>
		</div>
	)
}
