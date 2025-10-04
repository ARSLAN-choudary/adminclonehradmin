import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { BackendService } from "../../../../Services/backend.service";

@Component({
  selector: "app-bolt-admin",
  imports: [RouterOutlet],
  templateUrl: "./bolt-admin.component.html",
  styleUrl: "./bolt-admin.component.scss",
})
export class BoltAdminComponent {
  constructor(private backend: BackendService) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.backend.getBoltCompanies().subscribe((res: any) => {
      localStorage.setItem(
        "bolt_companies",
        JSON.stringify(res.data.company_ids)
      );
    });
  }
}
