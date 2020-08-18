import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListsComponent} from './lists/lists.component';
import {MessagesComponent} from './messages/messages.component';
import {MemberListComponent} from './member-list/member-list.component';
import {AuthGuard} from '../app/_guards/auth.guard';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '', // localhost:4200/'children'
        runGuardsAndResolvers: 'always', // always run the guard
        canActivate: [AuthGuard],
        children:
        [
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
            {path: 'members', component: MemberListComponent},
        ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
