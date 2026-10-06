import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonIcon
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, star } from 'ionicons/icons';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonIcon
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  total = signal<number>(0);
  loading = signal<boolean>(false);
  error = signal<string>('');

  // Paginación
  limit = 8;
  skip = signal<number>(0);

  constructor() {
    addIcons({ star, chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    // Si tu ProductService no acepta parámetros limit/skip, puedes ampliar el servicio o hacer el get directo:
    this.productService.getProducts().subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);
      }
    });
  }

  // Getters auxiliares para paginación local
  get currentPage(): number {
    return Math.floor(this.skip() / this.limit) + 1;
  }

  get totalPages(): number {
    return Math.ceil(this.total() / this.limit);
  }

  get pagedProducts(): Product[] {
    const start = this.skip();
    return this.products().slice(start, start + this.limit);
  }

  nextPage(): void {
    if (this.skip() + this.limit < this.total()) {
      this.skip.update(s => s + this.limit);
    }
  }

  prevPage(): void {
    if (this.skip() > 0) {
      this.skip.update(s => Math.max(0, s - this.limit));
    }
  }
}