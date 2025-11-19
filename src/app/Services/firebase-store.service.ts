import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, setDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseStoreService {
  constructor(private firestore: Firestore) {}

  // ✅ Save (or update) email + URL by deviceId
  async saveUrlByDeviceId(
    userId: string,
    email: string,
    url: string,
    status: string,
    role: string,
    deviceId: string
  ) {
    try {
      const docRef = doc(this.firestore, `baseUrl/${userId}`);

      // Always overwrite with latest email and url
      await setDoc(
        docRef,
        { email, url, status, role, deviceId },
        { merge: true }
      );

      console.log(`✅ Email & URL saved successfully for deviceId: ${userId}`);
    } catch (error) {
      console.error("❌ Error saving email/url:", error);
    }
  }

  // ✅ Get email + URL by deviceId
  async getDeviceData(
    deviceId: string
  ): Promise<{ email?: string; url?: string } | null> {
    try {
      const docRef = doc(this.firestore, `baseUrl/${deviceId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data() as { email?: string; url?: string };
      } else {
        console.warn(`⚠️ No data found for deviceId: ${deviceId}`);
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching data:", error);
      return null;
    }
  }

  // ✅ Update only the URL (keep email same)
  async updateUrlByUserId(deviceId: string, newUrl: string) {
    try {
      const docRef = doc(this.firestore, `baseUrl/${deviceId}`);
      await setDoc(docRef, { url: newUrl }, { merge: true });
      console.log(`🔄 URL updated successfully for deviceId: ${deviceId}`);
    } catch (error) {
      console.error("❌ Error updating URL:", error);
    }
  }
  async updateUrlByDeviceAndUserId(
    deviceId: string,
    newUrl: string,
    userId: string
  ) {
    try {
      const docRef = doc(this.firestore, `baseUrl/${deviceId}`);

      await setDoc(
        docRef,
        {
          url: newUrl,
          userId: userId,
        },
        { merge: true }
      );

      console.log(
        `🔄 URL & userId updated successfully for deviceId: ${deviceId}`
      );
    } catch (error) {
      console.error("❌ Error updating URL:", error);
    }
  }
}
