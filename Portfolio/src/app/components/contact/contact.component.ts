import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contacts = [
    { icon: 'fas fa-envelope', label: 'EMAIL', value: 'abdullah.ramadanali@gmail.com', href: 'mailto:abdullah.ramadanali@gmail.com', color: '#00d4ff', bg: 'rgba(0,212,255,0.1)' },
    { icon: 'fas fa-phone', label: 'PHONE', value: '+201110554601', href: 'tel:+201110554601', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
    { icon: 'fas fa-map-marker-alt', label: 'LOCATION', value: 'Al Warraq, Giza, Egypt', href: '#', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  ];

  features = [
    'Fast delivery & clean code',
    'Angular & .NET Core expertise',
    'Clear communication & documentation',
    'Open to freelance & full-time roles',
  ];
}
