import qs from 'qs';
const LoginPost = (ajaxinstance) => {
    const customer = {}
    customer.Login = (mobile,password,actid) => {
      return ajaxinstance.post('login',qs.stringify({
        mobile:mobile,
        password:password,
        aid:actid
      }));
    }
  
    return customer
  }
  
  export default LoginPost

  