import { Routes } from '@angular/router';

import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full',
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    }
]
