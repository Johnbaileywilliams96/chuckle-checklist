import { useState, useEffect } from "react"
import { getAllJokes, createNewJoke, addJoke, deleteJoke } from "./services/jokeService.js"
import "./App.css"

export const App = () => {
  const [newJokes, setNewJokes] = useState([])
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])
 
  

  const transientState = {
    "id": 0,
    "text": newJokes,
    "told": false
  }

  const fetchAllJokes = () => {
    getAllJokes().then((jokesArray) => 
      setAllJokes(jokesArray))
    console.log("yooooo")
  }

  useEffect (() => {
   
  fetchAllJokes()
  
  
  }, [])

  //trying to automate when you want the application to refresh 
  useEffect(() => {
    if(allJokes.length > 0) {
      const theUntoldJokes = allJokes.filter(
        (joke) => joke.told === false
      )
      const theToldJokes = allJokes.filter(
        (joke) => joke.told === true
      )
      console.log(untoldJokes.length)
      setUntoldJokes(theUntoldJokes), setToldJokes(theToldJokes)
      console.log("heyyyyyy")
  
    }
  }, [allJokes, setNewJokes])


  const switchToldAndUntold = (jokeId) => {
      const sortedJokeId = allJokes.map(joke => joke.id === jokeId ? {...joke, told: !joke.told } : joke) 
      setAllJokes(sortedJokeId)
      const findJoke = sortedJokeId.find(joke => joke.id === jokeId);
      addJoke(findJoke)
    }

    const handleDelete = (jokeId) => {

      const remainingJokes = allJokes.filter(joke => joke.id !== jokeId)
      setAllJokes(remainingJokes)
      deleteJoke(jokeId)
     
    }
  

  return <div className="app-heading">
    <h1 className="app-heading-text">Chuckle Checklist!</h1>
    <h2>Add Joke</h2>

    

    <div className="joke-add-form">
    <input
        value={newJokes}
        className="form"
        onChange={(event) => {
          setNewJokes(event.target.value)
        }}
        type="text"
        placeholder="New One Liner"
      />
      <button className="joke-input-submit" onClick={ async () => ( await
        createNewJoke(transientState), setNewJokes(""), fetchAllJokes())}>Add</button>
    </div>
  
    <div className="joke-lists-container">
    
      <article className="untold-count">
      <h2>Untold:<span>{untoldJokes.length}</span></h2>
        <div>
      {untoldJokes.map(joke => {
        return (
          <div className="joke-list-item" key={joke.id}>
           <div className="joke-list-item-text">{joke.text}</div>
           <button className="smile" onClick={() => (
              switchToldAndUntold(joke.id) 
              )}>Told?</button>
              <>
              
              <button className="delete" onClick={() => (
                handleDelete(joke.id) 
                )}>Delete?</button>
              
              </>

              </div>
        )
      })}
      </div>
      </article>
        
        <div className="told-count">
        <h2>Told:<span>{toldJokes.length}</span></h2>

          <div className="told-count">
        {toldJokes.map(joke => {
        return (
          <div className="joke-list-item" key={joke.id}>
           <div className="joke-list-item-text">{joke.text}</div>
           <button className="smile" onClick={() => (
              switchToldAndUntold(joke.id) 
           )}>Untold?</button>

<>
              
              <button className="delete" onClick={() => (
                handleDelete(joke.id) 
                )}>Delete?</button>
              
              </>

          </div>
        )
      })}
        </div>
        </div>
    </div>
  
  </div>

}
