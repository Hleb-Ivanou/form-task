import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserService } from '../user.service';
import { ROLES } from '../mock/roles.mock';
import { SKILLS } from '../mock/skills.mock';
import { LOCATIONS } from '../mock/locations.mock';
import { Role } from '../mock/role.model';
import { User } from '../mock/user.model';
import { Skill } from '../mock/skill.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  profileForm = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\+375\((17|25|29|33|44)\)[0-9]{3}[0-9]{2}[0-9]{2}$/)]],
    roles: this._formBuilder.array(ROLES),
    checkedRoleId: [''],
    skills: this._formBuilder.array([]),
    checkedSkillsId: [[]],
    locations: this._formBuilder.array(LOCATIONS),
    isReadyToRelocate: [false],
    checkedlocationsId: [[]],
  });

  skills: Skill[] = SKILLS;
  initialForm;
  currentUser: User = <User>{};
  isShowForm: boolean;
  errorMsg = {
    required: 'This field is required!',
    email: 'Invalid email address!',
    phone: 'Invalid phone number!'
  };
  mask = ['+', '3', '7', '5', '(', /[1-9]/, /[1-9]/, ')', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/];

  constructor(private _formBuilder: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this.initialForm = this.profileForm.value;
    this._userService.getCurrentUser().subscribe(current => {
      this.currentUser = current;
      this.fillForm(this.currentUser);
    });
    this._userService.getIsShowForm().subscribe(value => this.isShowForm = value);
    this.roleObs().subscribe(value => this.profileForm.patchValue(
      {
        skills: SKILLS.filter(el => {
          console.log('onInit:', el);
          return el.id === this.profileForm.value.checkedRoleId;
        })
      }
    ));
  }

  get profileFormComtrols() {
    return this.profileForm.controls;
  }



  fillForm(user: User): void {
    if (Object.keys(user).length) {
      this.profileForm.patchValue(user);
    } else {
      this.profileForm.reset(this.initialForm);
    }
    console.log(this.profileForm.value);
  }

  onChangeRole(role: Role): void {
    this.profileForm.patchValue({
      checkedRoleId: role.id
    });
  }

  roleObs() {
    return of(this.profileForm.value.checkedRoleId);
  }

  onChangeReadyToRelocate() {
    this.profileForm.patchValue({
      isReadyToRelocate: !this.profileForm.value.isReadyToRelocate
    });
    const skillsArray = this.profileForm.get('skills') as FormArray;
    this.skills.forEach(el => skillsArray.push(new FormControl(false)));
  }

  onSubmit() {

    const { roles, skills, locations, ...newUserFromForm } = this.profileForm.value;
    this.currentUser = newUserFromForm;
    const newUser = Object.assign(
      { id: this.currentUser ? this.currentUser.id : this._userService.generateUserId() },
      this.currentUser
    );
    this._userService.submitForm(newUser);
  }


}
