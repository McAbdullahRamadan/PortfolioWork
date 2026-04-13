import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  roles = [
    'Full-Stack Developer',
    'Angular Specialist',
    'ASP.NET Core Expert',
    'UI/UX Enthusiast',
    'Problem Solver',
  ];
  currentRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private deleting = false;
  private timer: any;

  ngOnInit() { this.type(); }
  ngOnDestroy() { clearTimeout(this.timer); }

  type() {
    const target = this.roles[this.roleIndex];
    if (!this.deleting) {
      this.currentRole = target.substring(0, this.charIndex + 1);
      this.charIndex++;
      if (this.charIndex === target.length) {
        this.deleting = true;
        this.timer = setTimeout(() => this.type(), 2000);
        return;
      }
    } else {
      this.currentRole = target.substring(0, this.charIndex - 1);
      this.charIndex--;
      if (this.charIndex === 0) {
        this.deleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
    }
    this.timer = setTimeout(() => this.type(), this.deleting ? 60 : 100);
  }
}
