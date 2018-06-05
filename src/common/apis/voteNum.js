import qs from 'qs';
const VoteNumPost = (ajaxinstance) => {
    const customer = {}
    customer.VoteNum = (pid) => {
      return ajaxinstance.post('votenumber',qs.stringify({
        pid:pid,
      }));
    }
  
    return customer
  }
  
  export default VoteNumPost

  