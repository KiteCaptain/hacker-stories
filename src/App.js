import * as React from 'react';
import './App.css';





const App = () => {
   const stories = [
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

   const [searchTerm, setSearchTerm] = React.useState('');

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
   }

   const searchedStories = stories.filter(function (story) {
      return story.title.includes(searchTerm)
   })

  return (
    <div className="App">
		<h1>Hello world, from Kite</h1>
		<hr></hr>
		<Search onSearch={handleSearch} />
      <hr></hr>
		<List list={stories} />
      {console.log("App renders")}
			
    </div>
    
  );
}

const Search = (props) => {
   return (
      <div>
         <label htmlFor="search">Search: </label>
         <input id="search" type="text" onChange={props.onSearch}/>
         
         {console.log("Searching...")}
      </div>
   )
}

const Item = (props) => (
   <li>
      <span>
         <a  href={props.item.url}>{props.item.title}</a>
      </span>
      <span>{props.item.author}</span>
      <span>{props.item.num_comments}</span>
      <span>{props.item.points}</span>

   </li>
)
function List(props) {
	return (
		<ul>
			{props.list.map((item) => {
				return(
					<Item key={item.objectID} item={item} />
				)
			})}
		</ul>
	)
} 





export default App;

