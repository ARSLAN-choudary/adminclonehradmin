import { Component, OnInit } from '@angular/core';
import { FirebaseStoreService } from '../../Services/firebase-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting-approval',
  imports: [],
  templateUrl: './waiting-approval.component.html',
  styleUrl: './waiting-approval.component.scss'
})
export class WaitingApprovalComponent implements OnInit {
  deviceId: any

  constructor(private firebaseStore: FirebaseStoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.deviceId = params['deviceId'] || '';
      this.updateUrl()
    })

  }


  updateUrl() {
    if (this.deviceId) {
      const currentUrl = window.location.href;
      this.firebaseStore.updateUrlByDeviceId(this.deviceId, currentUrl)
    }
  }
}
