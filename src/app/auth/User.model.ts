export class User {
    constructor(
      public email: string,
      public id: string,
      private _token: string,
      private _tokenExpirationDate: Date
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
  }

/*
     constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate : Date
    ){}
    באמצעות הבנאי אנחנו יכולים לבנות מופעים של המודל שמשמש כתבנית למשתמשים
*/

/*
     get token() {
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
            return null;
        return this._token;
    }
מכיוון שהמאפיינים הקשורים לטוקן הם פרטיים הגישה אליהם צריכה להיות דרך פונקציה
בגוף הפונקציה מתבצעת בדיקה לגבי הסטטוס הנוכחי של תוקף הטוקן
אם התוקף אינו קיים או שתאריך היום גדול מתקופו כלומר הוא לא בתוקף נחזיר נאל
אחרת נחזיר את הטוקן עצמו

*/