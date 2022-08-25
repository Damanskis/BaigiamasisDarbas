const authorize = async (username, password) => {
    try{
        const response = await fetch(`/api/users/login`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                username,
                password
            }),
        });
        const responseData = await response.json();
        if(response.status === 200){
            localStorage.setItem('token', btoa(`${responseData.user.username}:${responseData.token}`))   
            return true;
        } else{
            let error;
            try{
                error = await response.json();
            } catch(e){
                error = {
                    status: response.status,
                    message: response.statusText
                }
            }
            return new Error(JSON.stringify(error));
        }
    } catch(e) {
        return false;
    }
}

const logout = async () => {
    try{
        const response = await fetch(`/api/users/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${atob(localStorage.getItem('token')).split(":")[1]}`
            },
        });
        if(response.status === 200){
            localStorage.removeItem('token')
            return true
        }
    } catch(e) {
        console.log('ERROR! Couldn\'t logout!')
    }
}

const registerUser = async(inputValues) => {
    try{
        const response = await fetch(`/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        });
        if(response.status === 201){
            return true;
        } 
    } catch(e){
        console.log('ERROR! Could\'t create new user')
    }
}

const likeClick = async(inputValues) => {
    try{
        const response = await fetch(`/api/users/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${atob(localStorage.getItem('token')).split(":")[1]}`
            },
            body: JSON.stringify(inputValues)
        });
        if(response.status === 204){
            return true;
        } 
    } catch(e){
        console.log('ERROR! Could\'t create new user')
    }
}

const dislikeClick = async(inputValues) => {
    try{
        const response = await fetch(`/api/users/dislike`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${atob(localStorage.getItem('token')).split(":")[1]}`
            },
            body: JSON.stringify(inputValues)
        });
        if(response.status === 204){
            return true;
        } 
    } catch(e){
        console.log('ERROR! Could\'t create new user')
    }
}

const getAllUsers = async () => {
  try{
    const response = await fetch(`/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${atob(localStorage.getItem('token')).split(":")[1]}`
      }
    });
    if(response.status === 200){
      return await response.json();
    } else {
      let error;
      try{
        error = await response.json();
      } catch(e){
        error = {
          status: response.status,
          message: response.statusText
        }
      }
      return new Error(JSON.stringify(error))
    }
  } catch(e) {
    return e;
  }
}


const getMyAccountData = async () => {
    try{
      const response = await fetch(`/api/users/myaccount`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${atob(localStorage.getItem('token')).split(":")[1]}`
        }
      });
      if(response.status === 200){
        return await response.json();
      } else {
        let error;
        try{
          error = await response.json();
        } catch(e){
          error = {
            status: response.status,
            message: response.statusText
          }
        }
        return new Error(JSON.stringify(error))
      }
    } catch(e) {
      return e;
    }
  }

export {
    authorize,
    logout,
    registerUser,
    getAllUsers,
    dislikeClick,
    likeClick,
    getMyAccountData
}