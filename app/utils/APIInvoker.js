const API_URL = 'http://api.localhost:3000'
const debug = false;

class APIInvoker {

  getAPIHeader(){
    return {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem("token"),
    }
  }

  invokeGET(url, okCallback, failCallback){
    let params = {
      method: 'get',
      headers: this.getAPIHeader()
    }
    this.invoke(url, okCallback, failCallback,params);
  }

  invokePUT(url, body, okCallback, failCallback){
    let params = {
      method: 'put',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invokePOST(url, body, okCallback, failCallback){
    let params = {
      method: 'post',
      headers: this.getAPIHeader(),
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invoke(url, okCallback, failCallback,params){
    if(debug){
      console.log("Invoke => " + params.method + ":" + url );
      console.log(params.body);
    }

    fetch(`${API_URL}${url}`, params)
    .then((response) => {
      if(debug){
        console.log("Invoke Response => " );
        console.log(response);
      }
      return response.json()
    })
    .then((responseData) => {
        if(responseData.ok){
          okCallback(responseData)
        }else{
          failCallback(responseData)
        }

    })
    //.catch((error) => {
    //  this.setState(prevState);
    //});
  }

}
export default new APIInvoker();
