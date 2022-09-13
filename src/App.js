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
      return story.title.toLowerCase().includes(searchTerm.toLowerCase())
   })

  return (
    <div className="App">
		<h1>Hello world, from Kite</h1>
		<hr></hr>
		<Search search={searchTerm} onSearch={handleSearch} />
      <p>
         Searching for {searchTerm}
      </p>
      <hr></hr>
		<List list={searchedStories} />
      {console.log("App renders")}
			
    </div>
    
  );
}

const Search = ({search, onSearch}) => {
   return (
      <div>
         <label htmlFor="search">Search: </label>
         <input id="search" type="text" onChange={onSearch} value={search}/>
         
         {console.log("Searching...")}
      </div>
   )
}

const Item = ({title, url, author, num_comments, points}) => (
   <li>
      <span>
         <a  href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
      {console.log("Item accessed..")}
   </li>
)
function List({list}) {
	return (
		<ul>
			{list.map((item) => {
				return(
					<Item key={item.objectID}{...item} />
				)
			})}
         {console.log("List updating")}
		</ul>
	)
} 





export default App;

