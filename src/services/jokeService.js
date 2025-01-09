 



 
export const createNewJoke = async (transientState) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transientState)
    }
  
    const response = await fetch("http://localhost:8088/jokes", postOptions)
}


export const addJoke = async (editedJoke) => {
    const postOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedJoke)
    }
  
    const response = await fetch(`http://localhost:8088/jokes/${editedJoke.id}`, postOptions)
}

export const deleteJoke = async (jokeId) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    
    }
  
    const response = await fetch(`http://localhost:8088/jokes/${jokeId}`, deleteOptions)
}







export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then((res) => res.json())
}

