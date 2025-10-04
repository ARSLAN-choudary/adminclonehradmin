import { Component, DestroyRef, signal } from "@angular/core";
import { BackendService } from "../../../../Services/backend.service";
import { catchError, of, switchMap, tap, timer } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

const TEN_MIN = 10 * 60 * 1000;
const REFRESH_MS = 9.5 * 60 * 1000; // 9m30s

@Component({
    selector: "app-dashboard",
    standalone: true,
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
    lastRefreshed = signal<Date | null>(null);
    error = signal<string | null>(null);

    // private readonly clientId = "vNkatedb03wF68AyMokEU";
    // private readonly secretKey =
    //     "7rH-LsjY1XugUe9RyVXTTWMoL8yOfDDi949gAWRtq2Wtl3VnrH1fBHJahb4Ln-gHcZRgwvmaz8yyDh7tXSj1ag";

    constructor(private backend: BackendService, private destroyRef: DestroyRef) {
        // Trigger immediately, then repeat every 9.5 minutes
    //     timer(0, REFRESH_MS)
    //         .pipe(
    //             switchMap(() =>
    //                 this.backend.getBoltTokenFromServer(this.clientId, this.secretKey).pipe(
    //                     tap((res: any) => {
    //                         if (res?.access_token) {
    //                             localStorage.setItem("bolt_access_token", res.access_token);
    //                             this.lastRefreshed.set(new Date());
    //                             this.error.set(null);
    //                             console.log("✅ Token refreshed at", new Date().toLocaleTimeString());
    //                         }
    //                     }),
    //                     catchError((err) => {
    //                         this.error.set("Failed to fetch Bolt token");
    //                         console.error("❌ Token fetch error:", err);
    //                         return of(null);
    //                     })
    //                 )
    //             ),
    //             takeUntilDestroyed(this.destroyRef)
    //         )
    //         .subscribe();
    }
    
}
