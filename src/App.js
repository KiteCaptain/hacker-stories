import * as React from 'react';
import './App.css';


const list = [
	{
	title: 'React',
	url: 'https://reactjs.org/',
	author: 'Jordan Walke',
	num_comments: 3,
	points: 4,
	objectID: 0,
	},
	{
	title: 'Redux',
	url: 'https://redux.js.org/',
	author: 'Dan Abramov, Andrew Clark',
	num_comments: 2,
	points: 5,
	objectID: 1,
	}];


function App() {
  const greetings ={
    greeting: "Hello",
    title: "React"
  }

  return (
    <div className="App">
		<h1>Hello world, from Kite</h1>
		<hr></hr>
		<ul>
			{list.map(function (item) {
			return <li>{item.title}</li>;
			})}
		</ul>
		<ul>
			{list.map(function (item) {
			return <li key={item.objectID}>{item.title}</li>;
			})}
		</ul>		
		<p>
			{list[0].title}
		</p>

		<p>
			{greetings.greeting}, {greetings.title}
		</p>

		<label htmlFor='search'>Search: </label>
		<input id="search" type="text"/>
    </div>
  );
}

export default App;
