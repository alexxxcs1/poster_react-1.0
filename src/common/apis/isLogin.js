import qs from 'qs';
const isLogin = (ajaxinstance) => {
    const customer = {}
    customer.isLogin = () => {
      return ajaxinstance.post('getLoginUser');
    }
  
    return customer
  }
  
  export default isLogin
