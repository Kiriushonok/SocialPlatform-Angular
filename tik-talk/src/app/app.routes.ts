import { Routes } from '@angular/router';
import { SearchPage } from './pages/search-page/search-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { LoginPage } from './pages/login-page/login-page';
import { ContentPageLayout } from './layouts/content-page-layout/content-page-layout';

export const routes: Routes = [
    {
        path: "", component: ContentPageLayout, children: [
            { path: "", component: SearchPage },
            { path: "profile", component: ProfilePage }
        ]
    },
    { path: "login", component: LoginPage }
];
