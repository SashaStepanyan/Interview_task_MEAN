import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from '../modals/user-form/user-form.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public rows = [];
  constructor(private userService: UsersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchUsers()
  }

  public fetchUsers() {
    this.userService.getUsersList().subscribe(res => {
      if (res.success) {
        this.rows = res.users;
      }
      console.log(res);
    })
  }

  public openUserModal(action, user?) {
    let modalRef = this.modalService.open(UserFormComponent)
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.user = user;

    modalRef.result.then(res => {
      this.fetchUsers();
    })
  }

  public deleteUser(content, id) {
    let modalRef = this.modalService.open(content);

    modalRef.result.then(() => {
      this.userService.deleteUser(id).subscribe(res => {
        this.fetchUsers()
      })
    });

  }

}
