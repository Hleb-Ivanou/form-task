import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { UserService } from '../user.service';

import { ROLES } from '../mock/roles.mock';
import { SKILLS } from '../mock/skills.mock';
import { LOCATIONS } from '../mock/locations.mock';

import { Role } from '../mock/role.model';
import { User } from '../mock/user.model';
import { timingSafeEqual } from 'crypto';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  allRoles: Role[] = ROLES;
  allSkills: string[] = SKILLS;
  allLocations: string[] = LOCATIONS;

  profileForm;
  initialForm;
  currentUser: User = <User>{};
  errorMsg = {
    required: 'This field is required!',
    email: 'Invalid email address!',
    phone: 'Invalid phone number!'
  };
  mask = ['+', '3', '7', '5', '(', /[1-9]/, /[1-9]/, ')', /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/, /[1-9]/];

  constructor(private _formBuilder: FormBuilder, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe(current => {
      this.currentUser = current;
      this.fillForm(this.currentUser);
    });
    this.profileForm = this.buidForm();
    this.profileForm.get('role').valueChanges.subscribe(value => {
      this.profileForm.setControl('skills', this.buildSkillsControls(value));
    });
  }

  buidForm(): FormGroup {
    return this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+375\((17|25|29|33|44)\)[0-9]{3}[0-9]{2}[0-9]{2}$/)]],
      role: [''],
      skills: this._formBuilder.array([]),
      isReadyToRelocate: [false],
      locations: [[]]
    });
  }

  filterSkillsByRole(checkedRole: string) {
    return this.allRoles.find(el => el.name === checkedRole).skills;
  }

  buildSkillsControls(checkedRole: string) {
    const abstractSkillArray = this._formBuilder.array([]) as FormArray;
    this.filterSkillsByRole(checkedRole).forEach(el => { abstractSkillArray.push(this._formBuilder.control(false)); });
    return abstractSkillArray;
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
  }

  get checkedSkills(): string[] {
    return this.filterSkillsByRole(this.profileForm.value.role).filter((el, i) => this.profileForm.value.skills[i]);
  }

  onSubmit() {
    console.log(this.checkedSkills);
    const { ...newUserFromForm } = this.profileForm.value;
  }


}
