import axios from 'axios';
const authURL ="https://pure-falls-11392.herokuapp.com/api"

const axiosTwitter = axios.create({
    authURL,
  });
//核對TOKEN
  axiosTwitter.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error(error);
    }
  );

  //取得所有推文
  export async function getTweets() {
    try {
      const res = await axiosTwitter.get(`${authURL}/tweets`);
      return res.data;
    } catch (error) {
      console.error('[Get Tweets failed]: ', error);
    }
  }
  //新增推文
  export async function addTweet(payload) {
    const { description } = payload;
    try {
      const res = await axiosTwitter.post(`${authURL}/tweets`, { description });
      return res.data;
    } catch (error) {
      console.error('[Create Tweets failed]: ', error);
      return error.response.data.status;
    }
  }

  //取得使用者推文
  export async function getUserTweets(){
    try{
        const res = await axiosTwitter.get(`${{authURL}}/users/{id}/tweets`)
        return res.data 
    }catch (error){
        console.error('[Get UserTweets failed]: ', error)
    }
  }