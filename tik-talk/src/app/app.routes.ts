import { Routes } from '@angular/router';
import { SearchPage } from './pages/search-page/search-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { ContentPageLayout } from './layouts/content-page-layout/content-page-layout';
import { LoginPage } from './features/auth/login-page/login-page';
import { canActivateAuth } from './features/auth/auth.guard';
import { SettingsPage } from './pages/settings-page/settings-page';


export const routes: Routes = [
    {
        path: "", component: ContentPageLayout, children: [
            { path: "", redirectTo: "profile/me", pathMatch: "full" },
            { path: "profile/:id", component: ProfilePage },
            { path: "settings", component: SettingsPage },
            { path: "search", component: SearchPage }
        ],
        canActivate: [canActivateAuth]
    },
    { path: "login", component: LoginPage }
];
