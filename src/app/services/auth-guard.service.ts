import { ChatService } from './chat.service';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public chatService: ChatService, public router: Router) { }
  canActivate(): boolean {
    if (!this.chatService.currentUser) {
      alert('Please login to continue');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
