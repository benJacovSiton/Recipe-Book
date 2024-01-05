import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{

    // קושר את המידע למחלקת css
    // class - זה מערך של כל המחלקות הזמינות ב css 
    @HostBinding('class.open') isOpen = false;

    // מאזין לאווינט - במקרה הזה אירוע לחיצה שמפעיל את הפונקציה פותח גלילה - הפונקציה משנה שאת ערכו של המאפיין כך שהוא יפתח ויסגר
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }

}

