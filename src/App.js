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

   const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'React');

   React.useEffect(() => {
      localStorage.setItem('search', searchTerm);
   }, [searchTerm])

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

const Item = ({item}) => (
   <li>
      <span>
         <a  href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      {console.log("Item accessed..")}
   </li>
)
function List({list}) {
	return (
		<ul>
			{list.map((item) => {
				return(
					<Item key={item.objectID} item={item} />
				)
			})}
         {console.log("List updating")}
		</ul>
	)
} 





export default App;

