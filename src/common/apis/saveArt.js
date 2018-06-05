import qs from 'qs';
const saveArtPost = (ajaxinstance) => {
    const customer = {}
    customer.SaveArt = (json) => {
      return ajaxinstance.post('addArticle',qs.stringify(json));
    }
  
    return customer
  }
  
  export default saveArtPost

  