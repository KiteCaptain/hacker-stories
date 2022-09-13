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
   new Promise((resolve) => 
      setTimeout(
            resolve({data: {stories: initialStories}}),
            2000
         )
      )

const storiesReducer = (state, action) => {
   switch (action.type) {
      case 'SET_STORIES':
         return action.payload;
      case 'REMOVE_STORY':
         return state.filter(
            (story) => action.payload.objectID !== story.objectID
         )
      default:
         throw new Error();
   }
}


// MAIN APP
const App = () => {
   // const [stories, setStories] = React.useState([]);
   const [isLoading, setIsLoading] = React.useState(false);
   const [isError, setIsError] = React.useState(false);
   const [stories, dispatchStories] = React.useReducer(
      storiesReducer, 
      [] 
   );
   React.useEffect(() => {
      setIsLoading(true);

      getAsyncStories().then((result) => {
      dispatchStories({
         type: 'SET_STORIES',
         payload: result.data.stories,
      });
      setIsLoading(false)
      }).catch(() => setIsError(true));
   }, []);
      

   

   const [searchTerm, setSearchTerm] = useSemiPersistentState('search','React');

   const handleRemoveStory = (item) => {
      dispatchStories({
         type: 'SET_STORIES',
         payload: item,
      });
   }      

   const handleSearch = (event) => {
      setSearchTerm(event.target.value);
   }

   const searchedStories = stories.filter((story) => {
      return story.title.toLowerCase().includes(searchTerm.toLowerCase())
   })


  return (
   <div className="App">
		<h1>Hello world, from Kite</h1>
		<hr></hr>
		<InputWithLabel
         id="search"
         value={searchTerm}
         isFocused 
         onInputChange={handleSearch}
         >
            <strong>Search: </strong>
      </InputWithLabel>
      <p>
         Searching for {searchTerm}
      </p>
      <hr></hr>
      {isError && <p>Something went wrong! Try Again</p>}
      {isLoading ? (
         <p>Loading...</p>
      ) : <List 
         list={searchedStories} 
         onRemoveItem={handleRemoveStory}/>
      }			
   </div>
    
  );
}

const InputWithLabel = ({
   id, 
   value, 
   type = "text", 
   onInputChange, 
   children, 
   isFocused}) =>{
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