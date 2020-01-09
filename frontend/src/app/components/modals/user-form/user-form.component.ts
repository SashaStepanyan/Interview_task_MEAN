import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {



  public colors = [
    { color: 'bg-primary', value: 'table-primary' },
    { color: 'bg-secondary', value: 'table-secondary' },
    { color: 'bg-success', value: 'table-success' },
    { color: 'bg-danger', value: 'table-danger' },
    { color: 'bg-warning', value: 'table-warning' },
    { color: 'bg-info', value: 'table-info' },
    { color: 'bg-light', value: 'table-light' },
  ]
  public userForm: FormGroup;
  @Input() action;
  @Input() user;
  constructor(private userService: UsersService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      color: ['']
    });
    console.log(this.user)
    if (this.user) {
      this.userForm.controls['firstName'].setValue(this.user.firstName);
      this.userForm.controls['lastName'].setValue(this.user.lastName);
      this.userForm.controls['email'].setValue(this.user.email);
      this.userForm.controls['color'].setValue(this.user.color);
    }
  }

  public saveUser() {
    if (this.action === 'add') {
      this.userService.createUser(this.userForm.value).subscribe(res => {
        if (res.success) {
          this.activeModal.close()
        }
      }, err => {
        console.log(err)
      })
    } else {
      this.userService.updateUser(this.userForm.value, this.user._id).subscribe(res => {
        if (res.success) {
          this.activeModal.close()
        }
      }, err => {
        console.log(err)
      })
    }

  }
  public closeModal() {
    this.activeModal.dismiss()
  }



}
