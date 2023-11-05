import React, { useEffect, useState } from 'react'
import { TheCatAPI } from "@thatapicompany/thecatapi";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import './cats.css'
import emptyHeart from '/empty-heart.png'
import fullHeart from '/full-heart.png'
import { Link } from 'react-router-dom';


function Cats() {
  const theCatAPI = new TheCatAPI(import.meta.env.VITE_CAT_API_KEY);
  
  const [userId, setUserId] = useState(null);
  const [catsImages, setCatImages] = useState([]);
  const [userVotes, setUserVotes] = useState([]);

  useEffect(() => {
    const storedUserId = Cookies.get('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const uuid = uuidv4()
      setUserId(uuid);
      Cookies.set('userId', uuid);
    }
  }, []);

  useEffect(() => {
    async function getUserVotes() {
      const votes = await theCatAPI.votes.getVotes(userId);
      return votes;
    }
    getUserVotes().then((votes) => {
      setUserVotes(votes);
    });

  }, []);

  useEffect(() => {
    async function getImagesWithBreeds() {
        const images = await theCatAPI.images.searchImages({
          limit: 9,
          hasBreeds: true,
          mimeTypes: ["png"],
        });
        return images;
      }

    getImagesWithBreeds().then((images) => {
      setCatImages(images)
    });
  }, []);

  async function upvoteImage(imageId) {
    const vote = await theCatAPI.votes.addVote({
      imageId: imageId,
      value: 1,
      subId: userId
    });
    return vote;
  }

  async function deleteVote(voteId) {
    const { message } = await theCatAPI.votes.deleteVote(voteId);
    return message;
  }

  const handleLike = async (event, id) => {
    const vote = findVoteByImageId(id);
    if (!!vote) {
      event.target.src = emptyHeart;
      const updatedUserVotes = userVotes.filter((v) => {
        return v.id !== vote.id;
      })
      setUserVotes(updatedUserVotes);
      await deleteVote(vote.id);
    } else {
      event.target.src = fullHeart;
      const newVote = await upvoteImage(id);
      setUserVotes([...userVotes, newVote]);
    }
  }

  const findVoteByImageId = (imageId) => {
    return userVotes.find((vote) => { 
      return vote.imageId === imageId
    })
  }

  const heart = (imageId) => {
    const vote = findVoteByImageId(imageId);

    return !!vote ? fullHeart : emptyHeart;
  }

  return (
    <>
      <h1>Please enjoy the adorable cat pictures!</h1>
      <Link className='nav-link' to='/votes' title="See my liked cats">
        <img className='heart' src={fullHeart}/>
      </Link>
      <div className='cats-container'>
        {
          catsImages.map(({id, url}) =>{
              return(
                  <div className="cat-tile" key={id}>
                    <img className='cat-image' src={url} alt={`cat-${id}`} />
                    <img className='heart' src={heart(id)} onClick={(event) => handleLike(event, id)}/>
                  </div>
              )
            })
        }
      </div>
    </>
  )
}

export default Cats