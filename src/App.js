import * as React from 'react';
import './App.css';



const useSemiPersistentState = (key, initialState) => {
   const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
   )

   React.useEffect(() => {
      localStorage.setItem(key, value)}, [value, key]
   )

   return [value, setValue];
}

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

   const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');

   

   

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
		<InputWithLabel
         id="search" label="Search" value={searchTerm} onInputChange={handleSearch} />
      <p>
         Searching for {searchTerm}
      </p>
      <hr></hr>
		<List list={searchedStories} />
      {console.log("App renders")}
			
    </div>
    
  );
}

const InputWithLabel = ({id, label, value, type = "text", onInputChange}) => (
   <>
      <label htmlFor={id}>{label}</label> & nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange} />
   </>
)

const Search = ({search, onSearch}) => {
   return (
      <>
         <label htmlFor="search">Search: </label>
         <input id="search" type="text" onChange={onSearch} value={search}/>
         
         {console.log("Searching...")}
      </>
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

