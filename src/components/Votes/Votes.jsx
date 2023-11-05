import React, { useEffect, useState } from 'react';
import { TheCatAPI } from "@thatapicompany/thecatapi";
import '../Cats/cats.css'
import { Link } from 'react-router-dom';
import CatIcon from '/small-cat.png'

function Votes() {
    const theCatAPI = new TheCatAPI(import.meta.env.VITE_CAT_API_KEY);
  const [userVotes, setUserVotes] = useState([]);

  useEffect(() => {
    async function getVotes() {
      const votes = await theCatAPI.votes.getVotes();
      return votes;
    }
    getVotes().then((votes) => {
        setUserVotes(votes)
      }); 
  }, []);

  async function deleteVote(id) {
    const { message } = await theCatAPI.votes.deleteVote(id);
    return message;
  }

  const handleRemove = async (id) => {
    const updatedVotes = userVotes.filter((v) => v.id !== id);
    setUserVotes(updatedVotes);
    await deleteVote(id);
  }

  return (
    <>
      <h1>Your liked Cats!</h1>
      <Link className='nav-link' to='/' title="See all cats">
        <img className='cat-icon' src={CatIcon}/>
      </Link>
      <div className='cats-container'>
        {
          userVotes.map(({id, image: {url}}) =>{
              return(
                  <div className="cat-tile" key={id}>
                    <img className='cat-image' src={url} alt={`cat-${id}`} />
                    <button onClick={() => handleRemove(id)}>Smelly cat</button>
                  </div>
              )
            })
        }
      </div>
    </>
  )
}

export default Votes