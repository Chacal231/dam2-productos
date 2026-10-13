import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonCheckbox, 
  IonSegment, 
  IonSegmentButton, 
  IonSpinner, 
  IonBadge,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.models';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonCheckbox, 
    IonSegment, 
    IonSegmentButton, 
    IonSpinner, 
    IonBadge,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class TodosPage implements OnInit {
  private todoService = inject(TodoService);

  todos: Todo[] = [];
  loading: boolean = true;
  error: string | null = null;
  filter: 'all' | 'pending' | 'completed' = 'all';
  isDarkMode = false;

  constructor() {
    addIcons({
      'sun-outline': icons.sunnyOutline,
      'moon-outline': icons.moonOutline,
      'arrow-back-outline': icons.arrowBackOutline
    });
  }

  ngOnInit() {
    const savedFilter = localStorage.getItem('todos_filter') as 'all' | 'pending' | 'completed';
    if (savedFilter) {
      this.filter = savedFilter;
    }
    this.loadTodos();
  }

  ionViewWillEnter() {
    this.loadTodos();
  }

  loadTodos() {
    this.loading = false; 
    this.error = null;

    if (this.filter === 'all') {
      this.todoService.getTodos().subscribe({
        next: (data) => {
          this.todos = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al cargar la lista de tareas';
          this.loading = false;
        }
      });
    } else {
      const isCompleted = this.filter === 'completed';
      this.todoService.getTodosByStatus(isCompleted).subscribe({
        next: (data) => {
          this.todos = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error al filtrar las tareas';
          this.loading = false;
        }
      });
    }
  }

  onFilterChange(event: any) {
    this.filter = event.detail.value;
    localStorage.setItem('todos_filter', this.filter);
    this.loadTodos();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.classList.toggle('ion-palette-dark', this.isDarkMode);
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}