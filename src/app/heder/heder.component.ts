import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heder',
  templateUrl: './heder.component.html',
  styleUrls: ['./heder.component.css']
})
export class HederComponent implements OnInit , OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe(
      () => {
        // Handle the data retrieval here if needed.
      },
      error => {
        // Handle any errors here.
      }
    );
  }
  

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}

// הפעולות בקומפוננט מקשרות את ממשק המשתמש עם הסרוויס שבתוכו קיימות הפעולות הממשות את בקשות Http

/*
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  הפעולה מעבירה לסרוויס כי קיימת בקשה לשמור את המתכונים בשרת
*/

/*
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
  הפעולה רשומה כמנוי ניתן לצפייה אין צורך ללמש כאן את הפעולה כי לא אכפת לנו מהתגובה שתגיע
*/

/*
  isAuth = false;
  private userSub: Subscription;
  המאפיין הראשון מייצג את הסטטוס של המשתמש שנכנס לאתר
  אותו מאפיין יקבל את הערך שלו מהאזנה באמצעות מנוי שעובר דרך הסרוויס
  המאפיין השני הוא כיבוי המנוי בקומפוננט מכיוון שאנחנו יצרנו האזנה בעצמנו
  עלינו לכבות אותה
*/

/*
   ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isAuth = ! user ? false : true; 
    }); 
  }
  באתחול הקומפוננט אנחנו נרצה להאזין לשינויים במשתמש שמתקשר עם הקומפוננט
  ומצבו מוחזק לכל המנויים בסרוויס - המנוי מקבל כפרמטר פעולה שמקבלת את המשתמש מהסרוויס
  הפעולה בודקת את המאפיין שקיים בתוך אובייקט המשתמש האם הוא מאושר ובכך קובעת
  את ערכו של המאפיין המייצג את זה בקומפוננט של הכותרת 
  לאחר מכן המאפיין עושה שימוש בהצגה או בהסתרה של רכיבים בקומפוננט על פי ערכו
*/