import qs from 'qs';
const ImageLoadPost = (ajaxinstance) => {
    const customer = {}
    customer.ImageLoad = (file) => {
      return ajaxinstance.post('controller.php?action=uploadimage',file);
    }
  
    return customer
  }
  
  export default ImageLoadPost

  