import { ChatService } from './../services/chat.service';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
    private chatService: ChatService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form() { return this.registrationForm.controls; }

  public onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.signup(this.registrationForm.value.email, this.registrationForm.value.password)
      .pipe(
        concatMap((result: any) => this.chatService.createUser(result.user.uid, {
          name: this.registrationForm.value.username,
          email: this.registrationForm.value.email,
          uid: result.user.uid,
          conversations: []
        })),
        concatMap((result1: any) =>
          this.authService.updateUsername(this.registrationForm.value.username)
        )).subscribe((data: any) => {
          this.loading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered succesfully' });
          this.router.navigate(['/login']);
        }, (error: any) => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${error.message}` });
        });
  }
}


