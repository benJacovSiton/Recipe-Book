import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}


/*
isLoginMode = true;
מאפיין המייצג את הסטטוס של המשתמש
*/

/*
onSwitchMode() {
  this.isLoginMode = !this.isLoginMode;
  הפעולה משנה את ערכו של המאפיין בעת הלחיצות על הכפתור 
  המשתמש יבחר במצב בהתאם למצבו במערכת - קיים במערכת ולהחתבר 
  או לא קיים במערכת וירשם
}
*/

/*
 onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs : Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
        authObs = this.authService.login(email , password);
    } 
    else{
        authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  משפט התנאי בהתחלה הוא שכבת הגנה נוספת כשהטופס מאושר
  כשהטופס נטען אנחנו במצב טעינה לכן המשתנה הבוליאני שווה לאמת ובסופו לשקר
  לאחר מכן אנחנו מחלצים את המידע מהקונטרולים
  בגוף הפעולה מתבצעת בדיקה של המצב רישום או ההתחברות
  את המידע מהקונטרולים נעביר לסרוויס ולפעולה הרלוונטית שתבצע בקשה
  הבקשה מחזירה ניתן לצפייה שנשמר במשתנה מסוג זהה
  אם הניתן לצפייה מכיל בתוכו שגיאה היא תפוענח ותוצג דרך הקומפוננט
  בסיום הפעולה נפרמט את הטופס ואת תכולתו
*/