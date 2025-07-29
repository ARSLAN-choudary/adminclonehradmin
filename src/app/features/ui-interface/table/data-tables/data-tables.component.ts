import { Component, OnInit } from "@angular/core";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router, RouterLink } from "@angular/router";
import {
  PaginationService,
  tablePageSize,
} from "../../../../shared/custom-pagination/pagination.service";
import { CustomPaginationComponent } from "../../../../shared/custom-pagination/custom-pagination.component";
import { FormsModule } from "@angular/forms";
import { routes } from "../../../../shared/routes/routes";
import {
  apiResultFormat,
  dataTables,
} from "../../../../shared/model/pages.model";
import { DataService } from "../../../../shared/data/data.service";
import { BackendService } from "../../../../Services/backend.service";

@Component({
  selector: "app-data-tables",
  templateUrl: "./data-tables.component.html",
  styleUrls: ["./data-tables.component.scss"],
  standalone: true,
  imports: [CustomPaginationComponent, MatSort, FormsModule, RouterLink],
})
export class DataTablesComponent implements OnInit {
  public routes = routes;
  public pageSize = 10;
  public skip = 0;
  public currentPage = 1;
  public totalData = 0;

  public tableData: dataTables[] = [];
  public serialNumberArray: number[] = [];

  public dataSource!: MatTableDataSource<dataTables>;
  public searchDataValue = "";
  public row = true;

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    // Initial fetch
    this.getTableData(this.skip, this.pageSize);
// 
    // When pagination emits new page info
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      if (this.router.url === this.routes.dataTable) {
        this.pageSize = res.pageSize;
        this.skip = res.skip;
        this.getTableData(res.skip, res.pageSize);
      }
    });
  }

  private getTableData(skip: number, limit: number): void {
    const payload: any = {
      start: skip,
      length: limit,
      search: { value: this.searchDataValue },
    };

    this.backendService.getCompany(payload).subscribe((apiRes: any) => {
      this.tableData = apiRes.data.data;
      this.totalData = apiRes.data.recordsTotal;
      this.serialNumberArray = this.tableData.map((_, i) => skip + i + 1);
      this.dataSource = new MatTableDataSource<dataTables>(this.tableData);
      this.row = this.tableData.length > 0;
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  public searchData(value: string): void {
    this.searchDataValue = value.trim().toLowerCase();
    this.skip = 0; // Reset to first page
    this.getTableData(this.skip, this.pageSize);
  }

  public sortData(sort: Sort): void {
    this.getTableData(this.skip, this.pageSize);
  }

  public selectAll(initChecked: boolean): void {
    this.tableData.forEach((f) => (f.isSelected = !initChecked));
  }
}
