import axios from 'axios';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import '../../styles/BookmarkButton.css';

const BookmarkButton = (props) => {

    const _sessionKey = sessionStorage.getItem("SessionKey");
    const gsId = props.data;
    const filledIcon = `${process.env.PUBLIC_URL}/assets/bookmark_filled.svg`;
    const unfilledIcon = `${process.env.PUBLIC_URL}/assets/bookmark_unfilled.svg`;

    // state for storing bookmark status, either true or false
    var [isBookmarked, setIsBookmarked] = useState(false);

    const BookmarkImg = styled('img')({
        margin: '-16px 17px -5px 18px',
        display: 'block',
        maxWidth: '50px',
        maxHeight: '50px'
    });

    // check the bookmark
    const checkBookmark = async() => {
        try {
            // get response from backend for gsId (ID der Tankstelle)
            const response = await axios.get(
                "http://localhost:3001/api/checkbookmark?sessionKey=" + 
                _sessionKey + 
                "&gsId=" + 
                gsId);
            // update local component state with response answer
            setIsBookmarked(response.data);
        } catch (error) {
            console.log("Error while checking bookmark: " + error);
        }
    }

    // onClick event for set or delete the bookmark
    const setBookmark = () => {
        if (!gsId) return

        if (!isBookmarked) {
            // add new user favorite to mySQL database
            axios.post("http://localhost:3001/api/favorite", {
                sessionKey: _sessionKey,
                gsId: gsId
            }).then(() => {
                // set internal bookmark state for reloading component ui
                checkBookmark();
            }).catch(error => {
                console.log("Error while adding new user favorite: " + error);
            });

        } else {
            // delete user favorite from mySQL database
            axios.delete('http://localhost:3001/api/deletefavorite', { 
                data: { 
                    sessionKey: _sessionKey,
                    gsId: gsId
                }
            }).then(() => {
                // set internal bookmark state for reloading component ui
                checkBookmark();
            }).catch(error => {
                console.log("Error while deleting existing user favorite: " + error);
            });
        }
    }

    // regularly checks the bookmark status, not only once!
    useEffect(() => {
        checkBookmark();
    });

    // rendering method for this component
    return (
        <button className="bookmarkButton">
            <BookmarkImg 
                alt="addRemoveFavoriteButton"
                src={(isBookmarked) ? filledIcon : unfilledIcon }
                onClick={ () => { setBookmark(); } } />
        </button>
    );
}

export default BookmarkButton;