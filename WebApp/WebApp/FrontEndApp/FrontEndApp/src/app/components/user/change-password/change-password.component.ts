import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IPasswordChangeRequest } from 'src/app/services/interfaces';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public changePasswordForm : FormGroup
  public validationMessage = ''

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      OldPassword : new FormControl(null, [Validators.nullValidator, Validators.required]),
      NewPassword : new FormControl(null, [Validators.nullValidator, Validators.required]),
      ConfirmPassword : new FormControl(null, [Validators.nullValidator, Validators.required]),
    })
  }

  onSubmit(){
    this.validationMessage = ''
    if(!this.changePasswordForm.valid){
      this.validationMessage = 'All fields must have value!'
      return
    }

    if(this.changePasswordForm.value.NewPassword !== this.changePasswordForm.value.ConfirmPassword){
      this.validationMessage = 'Passwords must match!'
      return
    }

    let data : IPasswordChangeRequest = {
      OldPassword : this.changePasswordForm.value.OldPassword,
      NewPassword : this.changePasswordForm.value.NewPassword,
      ConfirmPassword : this.changePasswordForm.value.ConfirmPassword
    }

    this.authService.changePassword(data)
  }
}
