import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  selector: 'app-auth-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css'
})
export class AuthFormComponent {
  
  processForm(form: NgForm) {
    if (form.valid) {
      console.log('Formulaire soumis:', form.value);
      alert('Authentification réussie!');
    }
  }

  
}