import React from "react";
import Box from '@mui/material/Box';
import {toast} from 'react-toastify';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Main from '../../components/Main'
import { useState, useEffect } from "react";
import { getMyAccountData } from '../../api';

const MyAccountUsers = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUserData();
    }, [])


    const getUserData = async () => {
        let users = await getMyAccountData();
        if(!(users instanceof Error)){
            setUser(users)
        } else {
            console.log(users)
        }
    }

    return (
        <Main>
            <h2>My account</h2>
            {
                user ? (
                    <Box sx={{ minWidth: 275, margin: "20px" }}>
                        <Card>
                            <CardContent>
                                <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" width="300px" ></img>
                                <div style={{textAlign: "center"}}>
                                    {user.username}
                                </div>
                                <div style={{textAlign: "center"}}>
                                    {user.city}
                                </div>
                                <div style={{textAlign: "center"}}>
                                    {user.gender}
                                </div>
                                <div style={{textAlign: "center"}}>
                                    {user.age}
                                </div>
                            </CardContent>
                            <CardActions style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                            
                            </CardActions>
                        </Card>
                    </Box>
                ): null
            }
        </Main>
        
      );
}

export default MyAccountUsers;