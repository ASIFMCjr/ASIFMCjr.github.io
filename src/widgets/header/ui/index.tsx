import React from 'react';
import './index.sass';
import { SearchBar } from 'entities/search';

export const Header = () => {
	return (
		<div className="header">
			<div className="header-logo">
				<a href="/" className="reverse">
					book
				</a>
			</div>
			<div className="header-search">
				<SearchBar />
			</div>
			<div className="header-nav">
				{/* <a href='/'>Main</a> */}
				<a href="/books">Books</a>
				<a href="/authors">Authors</a>
				<a href="/auth">Auth</a>
				<a href="/cart">Cart</a>
			</div>
		</div>
	);
};
