import React from "react";
import Box from '@mui/material/Box';
import {toast} from 'react-toastify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Main from '../../components/Main'
import { useState, useEffect } from "react";
import { getAllUsers, likeClick, dislikeClick } from '../../api';

const Users = () => {
    const [users, setUsers] = useState(null);
    const [clickedButtons ,setClickedButtons] = useState([])
    useEffect(() => {
        getAllUsersData();
    }, [])


    const getAllUsersData = async () => {
        let users = await getAllUsers();
        if(!(users instanceof Error)){
            console.log(users)
            setUsers(users)
          } else {
            console.log(users)
          }
    }

    const onLikeButtonClick = async (userID) => {
        let likeClickAcc = await likeClick({
            userID
        })
        if(!(likeClickAcc instanceof Error)){
            toast.success('Successfully liked user!', {
                autoClose: 10000,
                pauseOnHover: true,
                toastId: 'deleteSuccess'
            })

            setClickedButtons([...clickedButtons, userID])
          } else {
            console.log(likeClickAcc)
          }
    }
    const onDislikeButtonClick = async (userID) => {
        let dislikeClickAcc = await dislikeClick({
            userID
        })
        if(!(dislikeClickAcc instanceof Error)){
            toast.success('Successfully disliked user!', {
                autoClose: 10000,
                pauseOnHover: true,
                toastId: 'deleteSuccess'
            })
            setClickedButtons([...clickedButtons, userID])
          } else {
            console.log(dislikeClickAcc)
          }
    }
    return (
        <Main>
               <h2>Users</h2>
            {
                users ? users.map((el, i) => {
                    return(
                        <Box sx={{ minWidth: 275, margin: "20px" }}>
                            <Card>
                                <CardContent>
                                    <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" width="300px" ></img>
                                    <div style={{textAlign: "center"}}>
                                        {el.username}
                                    </div>

                                </CardContent>
                                <CardActions style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                    
                                    <>
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            onLikeButtonClick(el._id);
                                            
                                        }} variant="contained" size="small"
                                        disabled={clickedButtons.includes(el._id)}
                                        >Like</Button>
                                        <Button onClick={(e) => {
                                            e.preventDefault()
                                            onDislikeButtonClick(el._id)
                                            
                                        }} variant="contained"size="small" color="error"  disabled={clickedButtons.includes(el._id)}>Dislike</Button>
                                    </>
                                        
                                    
                                </CardActions>
                            </Card>
                        </Box>
                    )
                }): null
            }
        </Main>
        
      );
}

export default Users;