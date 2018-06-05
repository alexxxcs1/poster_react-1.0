import qs from 'qs';
const myAarticlePost = (ajaxinstance) => {
    const customer = {}
    customer.myAarticle = (ActID) => {
      return ajaxinstance.post('myAarticleInAc',qs.stringify({
        pid:ActID,
      }));
    }
  
    return customer
  }
  
  export default myAarticlePost

  