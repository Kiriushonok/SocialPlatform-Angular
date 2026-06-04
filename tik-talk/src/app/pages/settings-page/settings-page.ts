import { Component, effect, inject, ViewChild } from '@angular/core';
import { ProfileHeader } from "../../shared/components/profile-header/profile-header";
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from "../../shared/components/button/button";
import { ProfileService } from '../../shared/services/profile';
import { firstValueFrom } from 'rxjs';
import { AvatarUpload } from "../../shared/components/avatar-upload/avatar-upload";

@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ɵInternalFormsSharedModule, ReactiveFormsModule, Button, AvatarUpload],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  formBuilder = inject(FormBuilder);
  profileService = inject(ProfileService);

  @ViewChild(AvatarUpload) avatarUploader!: AvatarUpload

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack)
      });
    })
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(this.profileService.uploadAvatar(this.avatarUploader.avatar));
    }

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfile({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))
  }

  splitStack(stack: string | null | undefined | string[]): string[] {
    if (!stack) return [];

    if (Array.isArray(stack)) return stack;

    return stack.split(",");
  }

  mergeStack(stack: string | null | undefined | string[]): string {
    if (!stack) return "";

    if (Array.isArray(stack)) return stack.join(",");

    return stack;
  }
}
