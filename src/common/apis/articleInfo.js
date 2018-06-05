import qs from 'qs';
const articleInfoPost = (ajaxinstance) => {
    const customer = {}
    customer.articleInfo = (ArtID) => {
      return ajaxinstance.post('articleInfo',qs.stringify({
        id:ArtID
      }));
    }
  
    return customer
  }
  
  export default articleInfoPost

  