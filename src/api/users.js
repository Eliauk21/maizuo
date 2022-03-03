import axios from 'axios';
function yzm(){
    return axios.get('/api/users/yzm')
}

function login(data){
    return axios.post('/api/users/login',data);
}

function info(){
    return axios.get('/api/users/info');
}

export {
    yzm,login,info
}