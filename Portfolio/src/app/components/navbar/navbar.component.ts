import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  menuOpen = false;

  navItems = [
    { num: '●', label: 'About', href: '#about' },
    { num: '●', label: 'Skills', href: '#skills' },
    { num: '●', label: 'Projects', href: '#projects' },
    { num: '●', label: 'Certs', href: '#certifications' },
    { num: '●', label: 'Contact', href: '#contact' },
  ];

  ngOnInit() {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
    if (this.menuOpen) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}
