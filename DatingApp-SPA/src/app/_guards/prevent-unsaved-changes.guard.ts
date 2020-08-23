import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {MemberEditComponent} from '../members/member-edit/member-edit.component';

@Injectable({
    // so no need to add in "app.module.ts" file
    providedIn: 'root' 
})
export class PreventUnsavedChanges implements CanDeactivate<MemberEditComponent>{
    canDeactivate(component: MemberEditComponent){
        if (component.editForm.dirty){
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
            // if confirm return true
        }
        return true;
    }
}
