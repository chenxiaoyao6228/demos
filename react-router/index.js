import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter as Router, Switch, Route, Link } from '/router';

export default function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/about'>About</Link>
						</li>
						<li>
							<Link to='/users'>Users</Link>
						</li>
					</ul>
				</nav>
				<Switch>
					<Route path='/about'>
						<About />
					</Route>
					<Route path='/users'>
						<Users />
					</Route>
					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function Home() {
	// useEffect(() => {
	// 	console.log(location);
	// });
	return <h2>Home</h2>;
}

function About() {
	// useEffect(() => {
	// 	console.log(location);
	// });
	return <h2>About</h2>;
}

function Users() {
	// useEffect(() => {
	// 	console.log(location);
	// });
	return <h2>Users</h2>;
}

const container = document.querySelector('#root');

ReactDOM.render(<App />, container);
