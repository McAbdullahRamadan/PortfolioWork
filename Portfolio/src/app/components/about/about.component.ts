import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  infos = [
    { icon: 'fas fa-map-marker-alt', label: 'Location', value: 'Al Warraq, Giza, Egypt' },
    { icon: 'fas fa-envelope', label: 'Email', value: 'abdullah.ramadanali@gmail.com' },
    { icon: 'fas fa-phone', label: 'Phone', value: '+201110554601' },
    { icon: 'fas fa-graduation-cap', label: 'Degree', value: 'B.Sc. Computer Information Systems' },
    { icon: 'fas fa-briefcase', label: 'Experience', value: 'Full-Stack Development' },
  ];

  highlights = [
    { icon: 'fas fa-layer-group', title: 'Full-Stack Expertise', desc: 'End-to-end development from Angular UIs to .NET Core APIs and SQL Server databases.' },
    { icon: 'fas fa-shield-alt', title: 'Security & Auth', desc: 'JWT, session management, password hashing, and secure API design.' },
    { icon: 'fas fa-bolt', title: 'Performance Focused', desc: 'Database optimization, lazy loading, and scalable architecture patterns.' },
  ];

}
