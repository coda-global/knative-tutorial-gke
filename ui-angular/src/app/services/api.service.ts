import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //apiURL: string = ' http://demo1997020.mockable.io';
  apiURL: string = 'http://user-service-nodejs.default.gdg.coda.digital';
  messagingURL: string = 'http://message-service-nodejs.default.gdg.coda.digital';

  constructor(private httpClient: HttpClient) {}

    public doLogin(name){
        return this.httpClient.post(`${this.apiURL}/login`,{"name": name});
    }

    public putHeartbeat(){
        return this.httpClient.put(`${this.apiURL}/heart-beat`,{"id": localStorage.getItem("id")});
    }

    public getActiveCount(){
        return this.httpClient.get(`${this.apiURL}/active`);
    }

    public getMessages(time, isLimit=true){
        if(isLimit)
        return this.httpClient.get(`${this.messagingURL}/?limit=`+time);
        else
        return this.httpClient.get(`${this.messagingURL}/`);
    }

    public postMessage(message){
        return this.httpClient.post(`${this.messagingURL}/`,{
            "userId": localStorage.getItem("id"),
            "userName": localStorage.getItem("name"),
            "message": message
        });
    }

    public getSentimentAnalysis(time, isLimit=true){
        if(isLimit)
        return this.httpClient.get(`${this.messagingURL}/sentiment?limit=`+time);
        else
        return this.httpClient.get(`${this.messagingURL}/sentiment`);
    }

}