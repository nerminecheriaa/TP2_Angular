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

  // Méthode de validation personnalisée pour le mot de passe
  validatePassword(password: string): boolean {
    return password.length >= 4;
  }

  // Méthode pour vérifier si un champ est vide
  isFieldEmpty(value: string): boolean {
    return value.trim() === '';
  }
}