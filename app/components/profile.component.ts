import { Component } from '@angular/core';
import {htmlTemplate} from '../views/profile.html';
import {GithubService} from '../services/github.service';

@Component({
  selector: 'my-app',
  template: htmlTemplate,
  providers: [GithubService]
})
export class ProfileComponent { 
	constructor(private GithubService:GithubService){
			console.log("????");
	}
	
}
