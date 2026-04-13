import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  categories = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Frontend',
      skills: [
        { name: 'Angular', icon: 'fab fa-angular', color: '#dd0031', level: 88 },
        { name: 'TypeScript', icon: 'fas fa-code', color: '#3178c6', level: 85 },
        { name: 'HTML / CSS', icon: 'fab fa-html5', color: '#e34f26', level: 90 },
        { name: 'JavaScript', icon: 'fab fa-js', color: '#f7df1e', level: 80 },
      ]
    },
    {
      icon: 'fas fa-server',
      title: 'Backend',
      skills: [
        { name: 'ASP.NET Core', icon: 'fas fa-dot-circle', color: '#512bd4', level: 85 },
        { name: 'C#', icon: 'fas fa-hashtag', color: '#239120', level: 82 },
        { name: 'Web API / REST', icon: 'fas fa-plug', color: '#00d4ff', level: 87 },
        { name: 'OOP / LINQ', icon: 'fas fa-cubes', color: '#7c3aed', level: 80 },
      ]
    },
    {
      icon: 'fas fa-database',
      title: 'Database & Cloud',
      skills: [
        { name: 'SQL Server', icon: 'fas fa-database', color: '#cc2927', level: 83 },
        { name: 'Azure (AZ-900)', icon: 'fas fa-cloud', color: '#0089d6', level: 70 },
        { name: 'AWS Fundamentals', icon: 'fab fa-aws', color: '#ff9900', level: 65 },
        { name: 'Data Science', icon: 'fas fa-chart-bar', color: '#10b981', level: 60 },
      ]
    }
  ];

  extras = ['AngularJS', 'Entity Framework', 'Clean Architecture', 'Git', 'Agile', 'AI Fundamentals', 'C# Programming'];
}
