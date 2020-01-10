import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../modals/user-form/user-form.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public rows: Array<User> = [];

  constructor(private userService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchUsers()
  }

  public fetchUsers() {
    this.userService.getUsersList().subscribe(res => {
      if (res.success) {
        this.rows = res.users;
      }
    })
  }

  public openUserModal(action: String, user?: any) {
    let modalRef = this.modalService.open(UserFormComponent)
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.user = user;

    modalRef.result.then(() => {
      this.fetchUsers();
    }, () => {
    })
  }

  public deleteUser(content: any, id: String) {
    let modalRef = this.modalService.open(content);

    modalRef.result.then(() => {
      this.userService.deleteUser(id).subscribe(() => {
        this.fetchUsers();
      })
    }, () => { });
  }

}
