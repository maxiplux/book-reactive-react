const API_URL = 'http://localhost:3000'

const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorization: 'any-string-you-like'
}

const debug = false;

class APIInvoker {

  invokeGET(url, okCallback, failCallback){
    let params = {
      method: 'get',
      headers: API_HEADERS
    }
    this.invoke(url, okCallback, failCallback,params);
  }

  invokePUT(url, body, okCallback, failCallback){
    let params = {
      method: 'put',
      headers: API_HEADERS,
      body: JSON.stringify(body)
    };

    this.invoke(url, okCallback, failCallback,params);
  }

  invokePOST(url, body, okCallback, failCallback){
    let params = {
      method: 'post',
      headers: API_HEADERS,
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
      if(response.ok){
        return response.json()
      } else {
        failCallback(response)
      }
    })
    .then((responseData) => {
        okCallback(responseData)
    })
    //.catch((error) => {
    //  this.setState(prevState);
    //});
  }

}
export default new APIInvoker();
