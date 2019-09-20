import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  
  messages: any = []; 
  sentiments: any = [];
  submittedInProgress = false;
  showLoading: boolean = true;
  messagingForm: FormGroup;
  submitted = false;
  serviceError = false;
  count = 0;
  countSuccess = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { 
    let userid = localStorage.getItem("id");
    if(userid == undefined || userid == ""){
      this.router.navigateByUrl("/login");
    }

    var that = this;
		setInterval(function(){ 
			that.apiService.getActiveCount().subscribe((res: any) => {
				console.log(res);
				if(res.count != undefined){
					that.count = res.count;
					that.countSuccess = true;
				} else {
					that.countSuccess = false;
				}
			});	
     }, 3000);
     
  }

  ngOnInit() {
    

    this.messagingForm = this.formBuilder.group({
      message: ['', Validators.required]
    });


    interval(3000).subscribe(x => {
			this.apiService.putHeartbeat().subscribe((res: any) => {
				console.log(res);
			});	
    });
    
    interval(5000).subscribe(x => {
      if(!this.submittedInProgress)
  			  this.getMessages();
    });
    
    this.initgetMessages();
  }

  getMessages(){
    if(this.messages.length>0){
      let unixTimeStamp = (this.messages[this.messages.length-1].timestamp._seconds*1000 + (this.messages[this.messages.length-1].timestamp._nanoseconds/1000000));
      this.apiService.getMessages(unixTimeStamp).subscribe((res: any)=>{
        this.messages.push(...res);
        var that = this;
        setTimeout(function(){ that.scrollToBottom();   }, 1000);   
      });
    } 
  }

  initgetMessages(){ 
    this.apiService.getMessages("", false).subscribe((res: any)=>{
      this.messages = res;
      this.showLoading = false;
      var that = this;
      this.initSentimentAnalysis();
      interval(5000).subscribe(x => {
        if(!this.submittedInProgress)
          this.initSentimentAnalysis();
      });
      setTimeout(function(){ that.scrollToBottom();   }, 1000);   
    });
  }

  initSentimentAnalysis(){
    this.apiService.getSentimentAnalysis("", false).subscribe((res: any)=>{
      this.sentiments = res;
      if(res.length > 0){
        var that = this;
        this.messages.forEach(function(message) {
          that.sentiments.forEach(function(sentiment) {
            if(sentiment[message.messageId])
              message["sentiment"] = sentiment[message.messageId].sentiment;             
          });
        });
      }
    });
  }

  getSentimentAnalysis(){
    let unixTimeStamp = (this.messages[this.messages.length-1].timestamp._seconds*1000 + (this.messages[this.messages.length-1].timestamp._nanoseconds/1000000));
    this.apiService.getSentimentAnalysis(unixTimeStamp).subscribe((res: any)=>{
      this.sentiments = res;
      if(res.length > 0){
        var that = this;
        this.messages.forEach(function(message) {
          that.sentiments.forEach(function(sentiment) {
            if(sentiment[message.messageId])
              message["sentiment"] = sentiment[message.messageId].sentiment;             
          });
        });
      }
    });
  }

  get f() { return this.messagingForm.controls; }

  sendMessage(){
    this.submitted = true;
    
    if (this.messagingForm.invalid) {
      return;
    }
    this.submittedInProgress = true;
    let message = this.messagingForm.get(['message']).value;
    this.apiService.postMessage(message).subscribe((res: any) => {
      console.log(res);
      if(res.id){
        this.messagingForm.setValue({"message":""});
        if(this.messages.length>0)
        {this.getMessages();} else if(this.messages.length==0){
          this.apiService.getMessages("", false).subscribe((res: any)=>{
            this.messages = res;
            var that = this;
            setTimeout(function(){ that.scrollToBottom(); }, 1000);   
          });
        }
        
      } else {
        this.serviceError = true;
      }
      this.submittedInProgress = false;
      this.submitted = false;
    });
  
  }

  toDate(unix_timestamp){
    return new Date(unix_timestamp*1000);
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  handleKeyEnter(event) {
    event.preventDefault();
    this.sendMessage();
  }
  
}
