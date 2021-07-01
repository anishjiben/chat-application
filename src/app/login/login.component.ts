import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';

import { ChatService } from './../services/chat.service';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private chatService: ChatService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (response: any) => {
          this.authService.setCurrentUser(response.user);
          this.chatService.setCurrentUser(response.user.uid);
          this.loading = false;
          this.router.navigateByUrl('/home');
        },
        (error) => {
          this.loading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect credentials', sticky: true });
        }
      );
    }
  }

}
