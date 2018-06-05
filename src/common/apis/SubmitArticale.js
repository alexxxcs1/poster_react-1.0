import qs from 'qs';
const SubmitArticalePost = (ajaxinstance) => {
    const customer = {}
    customer.submitArt = (id) => {
      return ajaxinstance.post('addArticleOver',qs.stringify({
        id:id
      }));
    }
  
    return customer
  }
  
  export default SubmitArticalePost