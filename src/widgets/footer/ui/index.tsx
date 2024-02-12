import React from 'react';
import './index.sass';

export const Footer = () => {
	return (
		<div className="footer">
			<div className="footer-section">
				<h1 className="footer-section__heading">
					About <span className="reverse">book</span> store
				</h1>
				<div className="footer-section__list">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem et
					tenetur praesentium at porro cumque fugiat consectetur voluptatibus ex
					repudiandae rerum similique, pariatur sed voluptatem vel dolorem, nam
					debitis reprehenderit distinctio! Repudiandae ut, blanditiis deserunt
					praesentium error labore delectus placeat, ab quam, aliquam laborum
					fugiat enim perspiciatis quas non. Perspiciatis!
				</div>
			</div>
			<div className="footer-section">
				<h1 className="footer-section__heading">Pages</h1>
				<div className="footer-section__list">
					{/* <a href='/'>Main</a> */}
					<a href="/books">Books</a>
					<a href="/authors">Authors</a>
					<a href="/auth">Authorization</a>
					<a href="/cart">Cart</a>
				</div>
			</div>
		</div>
	);
};
