import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './User.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCstl2pcpIvb-FfJ-AvRlgCP9YJ1VN9k_M',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCstl2pcpIvb-FfJ-AvRlgCP9YJ1VN9k_M',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

  
/*
  interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered ?: boolean;
  }
  מידע שהבאק אנד מחזיר אחרי הבקשה 
  אנחנו נעטוף אותו מתחת לממשק כדי להקל על הגישה עליהם 
  התחבר הוא מאפיין אופציונלי מכיוון שהוא מופיע בבקשת ההתחברות ולא ההרשמה
*/

/*
   user = new BehaviorSubject<User>(null);
   באמצעות התנהגות נושא אנחנו יכולים לפלוט אירוע וגם לגשת לתכונות ללא צורך באירוע
*/

/*
 
    signup(email: string, password: string) {
      return this.http
        .post<AuthResponseData>(
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCstl2pcpIvb-FfJ-AvRlgCP9YJ1VN9k_M',
          {
            email: email,
            password: password,
            returnSecureToken: true
          }
        )
        .pipe(catchError(this.handleError) , tap(resData => {
            this.handleAuthentication(resData.email , resData.localId , resData.idToken ,  +resData.expiresIn);
          }))
    }

      הפעולה מטפלת ברישום המשתמש לאתר המתכונים
      הפונקציה מחזירה ניתן לצפייה למנוי שמאזין לו בקומפוננט
      אם מתקבלת שגיאה חזרה מהשרת באמצעות פייפ אנחנו נקלף את השכבה הראשונה 
      של האובייקט ונעביר אותו לפונקציה שבוחנת את תוכן השגיאה ומחזירה הודעת
      שגיאה מתאימה
      הפרמטר השני לפייפ היא אופרטור טאפ שמאפשר לבצע פעולות על המידע שהתקבל
      תוך כדי ריצה וללא הפרעה האופרטור מקבל כארגומנט פעולה שמקבלת את פרטי המשתמש
      כאובייקט על פי מודל המשתמש שיצרנו הפעולה קוראת לפעולה נוספת ומעבירה אליה
      את כל המידע שיש באובייקט על פי המאפיינים שלו במודל

/*
      login(email: string , password: string){
        return this.http.post<AuthResponseData>(
            'https://https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCstl2pcpIvb-FfJ-AvRlgCP9YJ1VN9k_M',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe(catchError(this.handleError) , tap(resData => {
            this.handleAuthentication(resData.email , resData.localId , resData.idToken ,  +resData.expiresIn);
          }))
      }
      בקשת התחברות לשרת בפיירבייס דורשת איימיל סיסמה ומשתנה בוליאני שמאותחל כאמת
      הפעולה בונה ומחזירה ניתן לצפייה שמנוי בקומפומננט מאזין לו
      אם מתקבלת שגיאה חזרה מהשרת באמצעות פייפ אנחנו נקלף את השכבה הראשונה 
      של האובייקט ונעביר אותו לפונקציה שבוחנת את תוכן השגיאה ומחזירה הודעת
      שגיאה מתאימה
      הפרמטר השני לפייפ היא אופרטור טאפ שמאפשר לבצע פעולות על המידע שהתקבל
      תוך כדי ריצה וללא הפרעה האופרטור מקבל כארגומנט פעולה שמקבלת את פרטי המשתמש
      כאובייקט על פי מודל המשתמש שיצרנו הפעולה קוראת לפעולה נוספת ומעבירה אליה
      את כל המידע שיש באובייקט על פי המאפיינים שלו במודל
*/

/*
      
      private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
      
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
      
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct';
            break;
        }
      
        return throwError(errorMessage);
      }

      הפעולה מופנת מאפשרויות ההתחברות / רישום למשתמש כאשר מתרשת שגיאה
      הפעולה מקבלת את שגיאת HTTP 
      ובוחנת אותה על ידי ההתרשויות השונות
      השגיאה היא אובייקט המכיל בתוכו את השגיאה ובתוכו יש סוגי שגיאה שונים
      בעיקרון הבדיקות מחולקות לשני נושאים בעיות כלליות ובעיות קלט 
      בעיות כלליות יחזרו שגיאה כללית ואילו בעיות קלט יקבלו אפיון ספציפי
*/

/*
      private handleAuthentication(email : string , userId : string ,token : string , expiresIn : number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email ,userId , token , expirationDate);
        this.user.next(user);
      }
      הפעולה מופנת ומופעלת על ידי התחברות או הרשמה של משתמש למערכת
      הפעולה מקבלת כפרמטרים את כל המידע של המשתמש עפ הגדרתו במודל
      הפעולה מעבדת את פרטי המשתמש ומעבירה אותו כפולט אירועים באמצעות סאבקג'ט
*/