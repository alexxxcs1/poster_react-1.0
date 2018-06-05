import qs from 'qs';
const ActInfoPost = (ajaxinstance) => {
    const customer = {}
    customer.ActInfo = (id) => {
      return ajaxinstance.post('getActivityInfo',qs.stringify({
        id:id
      }));
    }
  
    return customer
  }
  
  export default ActInfoPost

  