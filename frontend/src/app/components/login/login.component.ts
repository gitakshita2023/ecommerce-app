import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; //for notification
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; //API calls

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.snackBar.open('Please enter username and password', 'Close', {
        duration: 3000
      });
      return;
    }

    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        
        if (response && response.success === true) {
          this.authService.setCurrentUser(response);
          this.snackBar.open('Login successful!', 'Close', {
            duration: 2000
          });
          this.router.navigate(['/dashboard']);
        } else {
          const errorMessage = response?.message || 'Invalid credentials';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Connection error! Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  testConnection(): void {
    this.authService.testBackend().subscribe({
      next: (response) => {
        this.snackBar.open('Backend connected: ' + response.message, 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Backend connection failed!', 'Close', {
          duration: 3000
        });
      }
    });
  }
}
