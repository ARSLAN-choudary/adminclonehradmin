import { Component, OnInit } from "@angular/core";
import { BackendService } from "../../../../Services/backend.service";

@Component({
  selector: "app-companies",
  imports: [],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.scss",
})
export class CompaniesComponent implements OnInit {
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
