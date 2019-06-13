import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IUserProfileResponse } from 'src/app/services/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public editProfileForm : FormGroup
  public oldData : IUserProfileResponse
  public newData : IUserProfileResponse

  public role = ''
  public validationMessage = ''

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.role = this.authService.checkLoggedIn() ? this.authService.getUserRole() : ''

    this.editProfileForm = new FormGroup({
      FirstName : new FormControl(null, [Validators.required, Validators.nullValidator]),
      LastName : new FormControl(null, [Validators.required, Validators.nullValidator]),
    })

    this.authService.subscribeToUserDataChanges().subscribe((data : IUserProfileResponse) =>{
      this.newData = {
        FirstName : data.FirstName,
        LastName : data.LastName,
        EncodedImage : data.EncodedImage,
        PassengerType : '',
        UserType : ''
      }
      this.oldData = data
      this.editProfileForm.setValue({FirstName : this.newData.FirstName, LastName : this.newData.LastName})
    })
    this.authService.getUserData()
  }

  onSubmit(){
    this.validationMessage = ''
    if(!this.editProfileForm.valid){
      this.validationMessage = 'All fields except Document must be filled'
    }

    if(this.editProfileForm.value.FirstName === this.oldData.FirstName 
      && this.editProfileForm.value.LastName === this.oldData.LastName
      && this.newData.EncodedImage === this.oldData.EncodedImage){
        this.validationMessage = "You didn't change anything!"
        return
      }
    
    this.newData.FirstName = this.editProfileForm.value.FirstName;
    this.newData.LastName = this.editProfileForm.value.LastName;
    this.authService.updateUser(this.newData)
  }

  onChange($event) : void{
    var file : File = $event.target.files[0]
    var reader : FileReader = new FileReader()

    reader.onloadend = (e) =>{
      this.newData.EncodedImage = <string>reader.result
    }
    reader.readAsDataURL(file)
  }
}
