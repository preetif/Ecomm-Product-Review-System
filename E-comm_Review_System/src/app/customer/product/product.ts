import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  // Directly inject HttpClient using Angular's inject function
  http = inject(HttpClient);

  // API URL provided by the user
  apiUrl = 'https://suppliantly-darkish-alfredo.ngrok-free.dev/api/products';

  // Array to hold the products list
  productList: any[] = [];

  // Object for adding/editing a product
  productObj: any = {
    "productId": 0,
    "productName": "",
    "description": "",
    "price": 0,
    "category": "",
    "imageUrl": "",
    "createdAt": new Date()
  };

  ngOnInit(): void {
    // Load products when the component starts
    this.getProducts();
  }

  // GET: Fetch all products
  getProducts() {
    this.http.get<any[]>(this.apiUrl).subscribe((res: any) => {
      this.productList = res;
    });
  }

  // POST: Create a new product
  onSave() {
    this.http.post(this.apiUrl, this.productObj).subscribe((res: any) => {
      alert("Product added successfully!");
      this.getProducts(); // Refresh the list
      this.resetForm();
    });
  }

  // PUT: Update an existing product
  onUpdate() {
    // Usually API uses productId in URL: apiUrl/id
    const updateUrl = `${this.apiUrl}/${this.productObj.productId}`;
    this.http.put(updateUrl, this.productObj).subscribe((res: any) => {
      alert("Product updated successfully!");
      this.getProducts(); // Refresh the list
      this.resetForm();
    });
  }

  // DELETE: Remove a product
  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete this product?");
    if (isDelete) {
      const deleteUrl = `${this.apiUrl}/${id}`;
      this.http.delete(deleteUrl).subscribe((res: any) => {
        alert("Product deleted successfully!");
        this.getProducts(); // Refresh the list
      });
    }
  }

  // Helper to set product for editing
  onEdit(item: any) {
    this.productObj = { ...item }; // Copy the item data to the form object
  }

  // Clear form
  resetForm() {
    this.productObj = {
      "productId": 0,
      "productName": "",
      "description": "",
      "price": 0,
      "category": "",
      "imageUrl": "",
      "createdAt": new Date()
    };
  }
}
