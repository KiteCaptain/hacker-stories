import { isFocusable } from '@testing-library/user-event/dist/utils';
import * as React from 'react';
import './App.css';


// Creating a custom hook
const useSemiPersistentState = (key, initialState) => {
   const [value, setValue] = React.useState(
      localStorage.getItem(key) || initialState
   )

   React.useEffect(() => {
      localStorage.setItem(key, value)}, [value, key]
   )

   return [value, setValue];
}

const initialStories = [
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
   },
   {
   title: 'Foxy',
   url: 'https://redux.js.org/',
   author: 'Dan Abramov, Andrew Clark',
   num_comments: 2,
   points: 5,
   objectID: 2,
   },
   {
   title: 'Zasgoat',
   url: 'https://redux.js.org/',
   author: 'Kite Abramov, Andrew Cernegie',
   num_comments: 2,
   points: 5,
   objectID: 3,
   },
   {
   title: 'Nukvisp',
   url: 'https://redux.js/',
   author: 'Dan Scott, Clark Undeson',
   num_comments: 2,
   points: 5,
   objectID: 4,
   },
   {
   title: 'Redux',
   url: 'https://redux.js.org/',
   author: 'Mr John, Doe Clark',
   num_comments: 2,
   points: 5,
   objectID: 5,
   }
];

const getAsyncStories = () => 
   Promise.resolve({data: {stories: initialStories}})

// MAIN APP
const App = () => {
   const [stories, setStories] = React.useState([]);

   React.useEffect(() => {
      getAsyncStories().then(result => {
         setStories(result.data.stories)
      })
   })

   const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');

   const handleRemoveStory = (item) => {
      const newStories = stories.filter(
         (story) => item.objectID !== story.objectID
      );
      setStories(newStories);
   }      

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
         id="search" label="Search" value={searchTerm} onInputChange={handleSearch}><strong>Search: </strong></InputWithLabel>
      <p>
         Searching for {searchTerm}
      </p>
      <hr></hr>
		<List list={searchedStories} onRemoveItem={handleRemoveStory}/>
      {console.log("App renders")}
			
    </div>
    
  );
}

const InputWithLabel = ({id, label, value, type = "text", onInputChange, children, isFocused}) =>{
   const inputRef = React.useRef();

   React.useEffect(() => {
      if (isFocused && inputRef.current) {
         inputRef.current.focus();        
      }
   }, [isFocused])

   return (
   <>
      <label htmlFor={id}>{children}</label>
      <input ref={inputRef} id={id} type={type} value={value} onChange={onInputChange} />
   </>
)}



const Item = ({item, onRemoveItem}) => {
   const handleRemoveItem = () => {
      onRemoveItem(item);
   }
   return (
      <li>
         <span>
            <a  href={item.url}>{item.title}</a>
         </span>
         <span>{item.author}</span>
         <span>{item.num_comments}</span>
         <span>{item.points}</span>
         <span>
            <button type="button" onClick={handleRemoveItem}>
               Dismiss
            </button>
         </span>
         {console.log("Item accessed..")}
      </li>
   )
}
function List({list, onRemoveItem}) {
	return (
		<ul>
			{list.map((item) => {
				return(
					<Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
				)
			})}
         {console.log("List updating")}
		</ul>
	)
} 





export default App;

