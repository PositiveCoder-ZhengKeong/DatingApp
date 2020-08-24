import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User; // from parent member-list
  isMale = true;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.checkMale();
  }

  checkMale(){
    if (this.user.gender === 'female') {
      this.isMale = false;
    }
  }
}
