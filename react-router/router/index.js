import React, { useState, useContext, useEffect } from 'react';

let HistoryContext = React.createContext();

export const HashRouter = ({ children }) => {
	const [record, setRecord] = useState({
		location: {
			pathname: window.location.hash.slice(1) || '/'
		}
	});

	useEffect(() => {
		window.location.hash = window.location.hash || '/';
		window.addEventListener('hashchange', handleHashChange, false);
		return () => {
			window.removeEventListener('hashchange', handleHashChange, false);
		};
	});
	function handleHashChange() {
		setRecord({
			location: {
				...record.location,
				pathname: window.location.hash.slice(1) || '/'
			}
		});
	}
	return (
		<HistoryContext.Provider value={{ record, setRecord }}>
			{children}
		</HistoryContext.Provider>
	);
};

// link组件: 触发路由跳转
export const Link = ({ to, children }) => {
	const { record, setRecord } = useContext(HistoryContext);
	useEffect(() => {});
	const handleClick = e => {
		// setRecord([...record, to]);
	};
	return <a onClick={handleClick}>{children}</a>;
};

export const Route = ({ path, children }) => {
	const { record, setRecord } = useContext(HistoryContext);
	useEffect(() => {
		// console.log(record.location.pathname);
	});
	// 根据路由是否匹配进行展示
	let match = path === record.location.pathname;
	return match ? children : null;
};

export const Switch = ({ children }) => {
	return children;
};
