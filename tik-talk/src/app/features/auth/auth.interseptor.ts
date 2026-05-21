import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "./auth-service";
import { catchError, switchMap, throwError } from "rxjs";

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (request, next) => {
    const authService = inject(AuthService);
    const accessToken = inject(AuthService).accessToken;

    if (!accessToken) {
        return next(request);
    }

    if (isRefreshing) {
        return refreshAndProceed(authService, request, next)
    }

    return next(addToken(request, accessToken))
        .pipe(
            catchError(error => {
                if (error.status === 403) {
                    return refreshAndProceed(authService, request, next)
                }
                return throwError(error);
            })
        );
}

const refreshAndProceed = (
    authService: AuthService,
    request: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    if (!isRefreshing) {
        isRefreshing = true;

        return authService.refreshAuthToken()
            .pipe(
                switchMap(response => {
                    isRefreshing = false;
                    return next(addToken(request, response.access_token));
                })
            );
    }

    return next(addToken(request, authService.accessToken!));
}

const addToken = (request: HttpRequest<any>, accessToken: string) => {
    return request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}