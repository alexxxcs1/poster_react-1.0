import qs from 'qs';
const loginOutPost = (ajaxinstance) => {
    const customer = {}
    customer.loginOut = () => {
      return ajaxinstance.post('loginOut',qs.stringify({
      }));
    }
  
    return customer
  }
  
  export default loginOutPost

  