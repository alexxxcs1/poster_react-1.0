import qs from 'qs';
const ArticleListPost = (ajaxinstance) => {
    const customer = {}
    customer.ArticleList = (ActId,is_taiwan) => {
      return ajaxinstance.post('getAarticleList',qs.stringify({
        pid:ActId,
        all:1,
        is_taiwan
      }));
    }
    customer.ArticleListMin = (ActId,page,pagesize,all) => {
        return ajaxinstance.post('getAarticleList',qs.stringify({
          pid:ActId,
          page:page,
          pagesize:pagesize,
          all:0,
        }));
      }
  
    return customer
  }
  
  export default ArticleListPost

  