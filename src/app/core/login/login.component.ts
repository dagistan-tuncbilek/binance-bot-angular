import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";
import {ActivatedRoute, Router} from "@angular/router";
import {DatabaseService} from "../services/database.service";
import {Subject, takeUntil} from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  private destroyed$ = new Subject<boolean>();

  constructor(
    private databaseService: DatabaseService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('Password11.',
        [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),]
      ),
    });
  }

  onSubmit(){
    if (this.form.valid){
      const data = {
        username: this.form.value.username.trim(),
        password: this.form.value.password.trim(),
      }
      this.spinner.show();
      this.databaseService.login(data).subscribe({
        next: response => {
          window.localStorage.setItem('accessToken', response.access_token);
          this.databaseService.accessToken = response.access_token;
          this.spinner.hide();
          this.router.navigate(['/']);
        },
        error: err => {
          this.spinner.hide();
          console.log(err);
        }
      })
    }
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
