import qs from 'qs';
const VotePost = (ajaxinstance) => {
    const customer = {}
    customer.Vote = (vid,aid,pid,isVote) => {
      return ajaxinstance.post('setvote',qs.stringify({
        vid:vid?vid:'',
        aid:aid?aid:'',
        pid:pid?pid:'',
        type:isVote?isVote:'',
      }));
    }
  
    return customer
  }
  
  export default VotePost

  