import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Main from '../../components/Main';
import { useState, useEffect } from "react";
import { getMyAccountData, getAllUsers } from '../../api';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function History() {
  const [value, setValue] = React.useState(0);
  const [user, setUser] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [dislikedUsers, setDislikedUsers] = useState([]);
  useEffect(() => {
      getUserData();
  }, [])

  useEffect(() => {
    if (user)
        getAllUsersData()
  }, [])

  const getAllUsersData = async () => {
    let users = await getAllUsers();
    if(!(users instanceof Error)){
        console.log(users)
        users.forEach((el, i) => {
            if(el.likes?.length > 0) {
                el.likes.forEach(like => {
                    if (like?._id == user?._id) {
                        setLikedUsers(data => [...data, el])
                    }
                })
            }
            if(el.dislikes?.length > 0) {
                el.dislikes.forEach(dislike => {
                    if (dislike?._id == user?._id) {
                        setDislikedUsers(data => [...data, el])
                    }
                })
            }
        })
      } else {
      }
    }

  const getUserData = async () => {
      let users = await getMyAccountData();
      if(!(users instanceof Error)){
          setUser(users)
      } else {
          console.log(users)
      }
  }


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Main>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
            <Tab label={`Liked (${likedUsers?.length})`} {...a11yProps(0)} />
            <Tab label={`Disliked (${dislikedUsers?.length})`} {...a11yProps(1)} />
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            {
                likedUsers ? likedUsers.map(el => (
                    <>
                     <Box sx={{ minWidth: 275, margin: "20px" }}>
                            <Card>
                                <CardContent>
                                    <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" width="300px" ></img>
                                    <div style={{textAlign: "center"}}>
                                        {el.username}
                                    </div>

                                </CardContent>
                                <CardActions style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                    
                                   
                                </CardActions>
                            </Card>
                        </Box>
                    </>
                )) : null
            }
        </TabPanel>
        <TabPanel value={value} index={1}>
        {
                dislikedUsers ? dislikedUsers.map(el => (
                    <>
                     <Box sx={{ minWidth: 275, margin: "20px" }}>
                            <Card>
                                <CardContent>
                                    <img src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg" width="300px" ></img>
                                    <div style={{textAlign: "center"}}>
                                        {el.username}
                                    </div>

                                </CardContent>
                                <CardActions style={{display: "flex", justifyContent:"center", alignItems:"center"}}>
                                    
                                   
                                </CardActions>
                            </Card>
                        </Box>
                    </>
                )) : null
            }
        </TabPanel>
        </Box>
    </Main>
    
  );
}