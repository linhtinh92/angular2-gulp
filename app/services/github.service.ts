import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GithubService {
	private username:string;
	private client_id = '';
	private client_secret = ''
	constructor() {
		console.log('this is github service');
	}
}


