import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {catchError, of, switchMap, tap, timer} from "rxjs";

@Injectable({providedIn: 'root'})
export class TokenRefreshService {
    private readonly clientId = 'vNkatedb03wF68AyMokEU';
    private readonly secretKey = "7rH-LsjY1XugUe9RyVXTTWMoL8yOfDDi949gAWRtq2Wtl3VnrH1fBHJahb4Ln-gHcZRgwvmaz8yyDh7tXSj1ag";
    private readonly REFRESH_MS = 9.5 * 60 * 1000;

    constructor(private backend: BackendService) {
        timer(0, this.REFRESH_MS)
            .pipe(
                switchMap(() =>
                    this.backend.getBoltTokenFromServer(this.clientId, this.secretKey).pipe(
                        tap(res => {
                            if (res?.access_token) {
                                localStorage.setItem('bolt_access_token', res.access_token);
                                console.log('✅ Token refreshed at', new Date().toLocaleTimeString());
                            }
                        }),
                        catchError(err => {
                            console.error('❌ Failed to refresh token:', err);
                            return of(null);
                        })
                    )
                )
            )
            .subscribe();
    }
}
