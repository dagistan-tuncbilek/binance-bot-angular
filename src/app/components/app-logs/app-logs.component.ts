import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subject, takeUntil} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {NgxSpinnerService} from "ngx-spinner";
import {AppLog} from "../../core/models/app-log";
import {DatabaseService} from "../../core/services/database.service";


@Component({
  selector: 'app-app-logs',
  templateUrl: './app-logs.component.html',
  styleUrls: ['./app-logs.component.scss']
})
export class AppLogsComponent implements AfterViewInit, OnInit, OnDestroy  {

  displayedColumns: string[] = ['level', 'message', 'stack', 'context', 'timestamp', 'deleteLog'];
  dataSource = new MatTableDataSource<AppLog>([]);
  private appLogs: AppLog[] = [];

  private destroyed$ = new Subject<boolean>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private databaseService: DatabaseService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.updateAppLogs();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  updateAppLogs() {
    this.databaseService.appLogs().subscribe({
      next: appLogs => {
        this.dataSource.data = appLogs.slice();
        this.appLogs = appLogs;
        this.spinner.hide();
      }
    })
  }

  onDelete(id: number) {
    this.spinner.show();
    this.databaseService.deleteAppLog(id).subscribe({
      next: (appLog) => {
        this.appLogs = this.appLogs.filter(log => log.id !== id);
        this.dataSource.data = this.appLogs.slice();
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  onDeleteAll() {
    this.spinner.show();
    this.databaseService.deleteAppLogs().subscribe({
      next: (data) => {
        this.dataSource.data = [];
        this.spinner.hide();
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
