import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {MemberListComponent} from './members/member-list/member-list.component';
import {AuthGuard} from '../app/_guards/auth.guard';
import {MemberDetailComponent} from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import {PreventUnsavedChanges} from '../app/_guards/prevent-unsaved-changes.guard';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '', // localhost:4200/'children'
        runGuardsAndResolvers: 'always', // always run the guard
        canActivate: [AuthGuard],
        children:
        [
            {path: 'lists', component: ListsComponent},
            // notice the ":"
            {path: 'members/:id', component: MemberDetailComponent, resolve: {user : MemberDetailResolver}},
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent}
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
