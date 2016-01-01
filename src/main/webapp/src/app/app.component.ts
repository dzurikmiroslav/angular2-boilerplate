import {Component} from 'angular2/core';
import {Http, Headers} from 'angular2/http';

interface LoginStuff {
    login: string;
    password: string;
}

@Component({
    selector: 'app',
    template: `
    <div class="container app">
        <form class="form-signin"
          (ngSubmit)="onSubmit()">
            <h2 class="form-signin-heading">Test login</h2>
            <div class="form-group">
              <input type="text" placeholder="Login" class="form-control" required
                [(ngModel)]="login.login"/>
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control" required
                [(ngModel)]="login.password"/>
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
      </form>
    </div>
  `,
    styles: [`
    .app {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
  `]
})
export class AppComponent {
    public login: LoginStuff = { login: null, password: null };
    private http: Http;
    constructor(http: Http) {
        this.http = http;
    }
    onSubmit(a) {
        var headers: Headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        this.http.post('rest/auth/login', JSON.stringify(this.login), { headers: headers })
            .subscribe(res => {
                console.log(res);
            });
    }
}
