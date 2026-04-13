import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'X-Change — Skill Exchange Platform',
      icon: 'fas fa-exchange-alt',
      iconBg: 'rgba(124,58,237,0.15)',
      iconColor: '#a78bfa',
      github: 'https://github.com/McAbdullahRamadan',
      desc: 'Full-stack platform where users can exchange skills, post offers, and connect through real-time chat.',
      features: [
        'JWT-based user authentication',
        'Skill posting & discovery system',
        'Real-time chat functionality',
        'Scalable REST API design',
      ],
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'SignalR'],
    },
    {
      title: 'Car Rental System',
      icon: 'fas fa-car',
      iconBg: 'rgba(0,212,255,0.12)',
      iconColor: '#00d4ff',
      github: 'https://github.com/McAbdullahRamadan',
      desc: 'Complete car rental management system with availability tracking, booking, and user management.',
      features: [
        'Real-time car availability tracking',
        'Booking & reservation system',
        'Clean architecture & SOLID principles',
        'Optimized CRUD operations',
      ],
      tags: ['ASP.NET Core', 'SQL Server', 'C#', 'REST API'],
    },
    {
      title: 'E-Commerce Web App',
      icon: 'fas fa-shopping-cart',
      iconBg: 'rgba(16,185,129,0.12)',
      iconColor: '#10b981',
      github: 'https://github.com/McAbdullahRamadan',
      desc: 'Full-stack e-commerce platform with product catalog, cart management, and order processing.',
      features: [
        'Product management & catalog',
        'Shopping cart & order processing',
        'Secure authentication & sessions',
        'Performance-optimized queries',
      ],
      tags: ['Angular', 'ASP.NET Core', 'SQL Server', 'TypeScript'],
    },
    {
      title: 'Hospital Management System',
      icon: 'fas fa-hospital',
      iconBg: 'rgba(239,68,68,0.12)',
      iconColor: '#f87171',
      github: 'https://github.com/McAbdullahRamadan',
      desc: 'Full-scale hospital system managing patients, doctors, scheduling, and billing with .NET MVC.',
      features: [
        'Patient records management',
        'Doctor scheduling system',
        'Billing & invoicing modules',
        'Entity Framework Core ORM',
      ],
      tags: ['.NET Core 6.0', 'MVC', 'EF Core', 'SQL Server'],
    },
    {
      title: 'Secure Login & Registration',
      icon: 'fas fa-shield-alt',
      iconBg: 'rgba(245,158,11,0.12)',
      iconColor: '#f59e0b',
      github: 'https://github.com/McAbdullahRamadan',
      desc: 'Production-grade authentication system with secure session management and password hashing.',
      features: [
        'Password hashing & salting',
        'Session management & cookies',
        'Input validation & anti-CSRF',
        '.NET Core 8.0 MVC',
      ],
      tags: ['.NET Core 8.0', 'MVC', 'Auth', 'Security'],
    },
    {
      title: 'HTML & CSS Templates + CRUD',
      icon: 'fas fa-palette',
      iconBg: 'rgba(251,113,133,0.12)',
      iconColor: '#fb7185',
      github: 'https://github.com/McAbdullahRamadan',
      desc: 'Collection of responsive HTML/CSS templates with vanilla JS CRUD functionality.',
      features: [
        'Fully responsive layouts',
        'Modern CSS techniques',
        'Vanilla JS CRUD apps',
        'Cross-browser compatible',
      ],
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    },
  ];

  getTagClass(tag: string): string {
    const map: Record<string, string> = {
      'Angular': 'tag tag-blue',
      'ASP.NET Core': 'tag tag-purple',
      '.NET Core 6.0': 'tag tag-purple',
      '.NET Core 8.0': 'tag tag-purple',
      'TypeScript': 'tag tag-blue',
      'SQL Server': 'tag tag-green',
      'EF Core': 'tag tag-green',
      'Security': 'tag tag-green',
    };
    return map[tag] || 'tag tag-blue';
  }
}
