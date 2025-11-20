import { Injectable } from "@angular/core";
import {
  Firestore,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

export interface UserDoc {
  email?: string;
  url?: string;
  status?: string;
  role?: string;
  deviceId?: string;
  appId?: string;
  termsAndCondition: boolean;
  nda: boolean;
  documentsRejected: boolean;
  
}

@Injectable({
  providedIn: "root",
})
export class FirebaseStoreService {
  constructor(private firestore: Firestore) {}

  // ✅ Save (or update) email + URL by deviceId
  async saveUrlByDeviceId(
    appId: string,
    email: string,
    url: string,
    status: string,
    role: string,
    deviceId: string
  ) {
    try {
      const docRef = doc(this.firestore, `application/${appId}`);

      // Always overwrite with latest email and url
      await setDoc(
        docRef,
        { email, url, status, role, deviceId },
        { merge: true }
      );

      console.log(`✅ Email & URL saved successfully for deviceId: ${appId}`);
    } catch (error) {
      console.error("❌ Error saving email/url:", error);
    }
  }

  // ✅ Get email + URL by deviceId
  async getDeviceData(
    appId: string
  ): Promise<{ email?: string; url?: string } | null> {
    try {
      const docRef = doc(this.firestore, `application/${appId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as { email?: string; url?: string };
      } else {
        console.warn(`⚠️ No data found for appId: ${appId}`);
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      return null;
    }
  }

  // ✅ Update only the URL (keep email same)
  async updateUrlByAppId(deviceId: string, newUrl: string) {
    try {
      const docRef = doc(this.firestore, `application/${deviceId}`);
      await setDoc(docRef, { url: newUrl }, { merge: true });
      console.log(`🔄 URL updated successfully for deviceId: ${deviceId}`);
    } catch (error) {
      console.error("❌ Error updating URL:", error);
    }
  }
  async updateUrlByDeviceAndAppId(
    deviceId: string,
    newUrl: string,
    appId: string
  ) {
    try {
      const docRef = doc(this.firestore, `application/${deviceId}`);

      await setDoc(
        docRef,
        {
          url: newUrl,
          appId: appId,
        },
        { merge: true }
      );

      console.log(
        `🔄 URL & appId updated successfully for deviceId: ${deviceId}`
      );
    } catch (error) {
      console.error("❌ Error updating URL:", error);
    }
  }
  watchUserById(appId: string): Observable<UserDoc | null> {
    return new Observable((sub) => {
      const ref = doc(this.firestore, "application", appId);

      const unsubscribe = onSnapshot(
        ref,
        (snap) => {
          if (snap.exists()) {
            sub.next(snap.data() as UserDoc);
          } else {
            sub.next(null);
          }
        },
        (err) => sub.error(err)
      );

      // cleanup on unsubscribe
      return () => unsubscribe();
    });
  }
}
