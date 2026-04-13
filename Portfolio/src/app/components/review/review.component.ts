import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import emailjs from '@emailjs/browser';
const STAR_LABELS: Record<number, string> = {
  1: '⭐ Poor — Needs a lot of work',
  2: '⭐⭐ Fair — Some improvements needed',
  3: '⭐⭐⭐ Good — Decent portfolio',
  4: '⭐⭐⭐⭐ Great — Very impressive!',
  5: '⭐⭐⭐⭐⭐ Excellent — Outstanding work!',
};
interface ReviewState {
  name: string;
  email: string;
  notes: string;
  starRating: number;
  scaleScore: number;
  loading: boolean;
  submitted: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}


@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit, OnDestroy {
  private readonly EMAILJS_SERVICE_ID = 'service_itjktng';
  private readonly EMAILJS_TEMPLATE_ID = 'template_ecs71h7';
  private readonly EMAILJS_PUBLIC_KEY = 'NEvdd_B0N5-fRbbEr';

  @ViewChild('formCard') formCard!: ElementRef;

  state: ReviewState = {
    name: '',
    email: '',
    notes: '',
    starRating: 0,
    scaleScore: 0,
    loading: false,
    submitted: false,
    errors: {},
    touched: {}
  };

  starLabels: Record<number, string> = {
    1: 'Poor — Needs a lot of work',
    2: 'Fair — Some improvements needed',
    3: 'Good — Decent portfolio',
    4: 'Great — Very impressive!',
    5: 'Excellent — Outstanding work!'
  };

  scaleNumbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private particleInterval: any;
  private animationFrame: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    emailjs.init(this.EMAILJS_PUBLIC_KEY);
    this.initParticles();
    this.initOrbParallax();
    this.loadSavedData();

    // اختبار EmailJS بعد 2 ثانية
    setTimeout(() => {

    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.particleInterval) clearInterval(this.particleInterval);
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
  }

  private loadSavedData(): void {
    const saved = localStorage.getItem('review_draft');
    if (saved) {
      try {
        const draft = JSON.parse(saved);
        this.state.name = draft.name || '';
        this.state.email = draft.email || '';
        this.state.notes = draft.notes || '';
      } catch (e) {}
    }
  }

  private saveDraft(): void {
    const draft = {
      name: this.state.name,
      email: this.state.email,
      notes: this.state.notes,
      timestamp: Date.now()
    };
    localStorage.setItem('review_draft', JSON.stringify(draft));
  }

  private initParticles(): void {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 30 : 60;

    for (let i = 0; i < particleCount; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'particle');

      const size = Math.random() * 6 + 2;
      const duration = Math.random() * 8 + 4;
      const delay = Math.random() * 10;
      const left = Math.random() * 100;
      const colors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      this.renderer.setStyle(particle, 'width', `${size}px`);
      this.renderer.setStyle(particle, 'height', `${size}px`);
      this.renderer.setStyle(particle, 'left', `${left}%`);
      this.renderer.setStyle(particle, 'animation', `particleFly ${duration}s linear infinite`);
      this.renderer.setStyle(particle, 'animationDelay', `${delay}s`);
      this.renderer.setStyle(particle, 'background', color);
      this.renderer.setStyle(particle, 'boxShadow', `0 0 ${size * 2}px ${color}`);

      this.renderer.appendChild(container, particle);
    }
  }

  private initOrbParallax(): void {
    let mouseX = 0, mouseY = 0;
    let orbX = 0, orbY = 0;

    const updateOrbs = () => {
      const orbs = document.querySelectorAll('.orb');
      orbs.forEach((orb, index) => {
        const factor = index === 0 ? 0.03 : 0.02;
        const x = orbX * factor;
        const y = orbY * factor;
        (orb as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
      });
      this.animationFrame = requestAnimationFrame(updateOrbs);
    };

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 50;
      mouseY = (e.clientY - window.innerHeight / 2) / 50;
      orbX = orbX * 0.9 + mouseX * 0.1;
      orbY = orbY * 0.9 + mouseY * 0.1;
    });

    updateOrbs();
  }

  onFieldInput(field: string, value: string): void {
    (this.state as any)[field] = value;
    this.state.touched[field] = true;
    this.validateField(field);
    this.saveDraft();
  }

  onStarHover(rating: number): void {
    const ratingText = document.getElementById('rText');
    if (ratingText && !this.state.submitted) {
      ratingText.textContent = this.starLabels[rating] || 'Click a star to rate';
      ratingText.classList.add('rated');
    }
  }

  onStarLeave(): void {
    const ratingText = document.getElementById('rText');
    if (ratingText && !this.state.submitted) {
      if (this.state.starRating > 0) {
        ratingText.textContent = this.starLabels[this.state.starRating];
      } else {
        ratingText.textContent = 'Click a star to rate';
        ratingText.classList.remove('rated');
      }
    }
  }

  setStarRating(rating: number): void {
    if (this.state.submitted) return;

    this.state.starRating = rating;
    this.state.scaleScore = rating * 2;
    this.state.touched['rating'] = true;
    this.validateField('rating');

    this.animateStars(rating);
    this.updateRatingText();
    this.updateScaleButtons();
  }

  private animateStars(rating: number): void {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('animate');
        setTimeout(() => star.classList.remove('animate'), 250);
      }
    });
  }

  private updateRatingText(): void {
    const ratingText = document.getElementById('rText');
    if (ratingText) {
      ratingText.textContent = this.starLabels[this.state.starRating];
      ratingText.classList.add('rated');
    }
  }

  setScaleScore(score: number): void {
    if (this.state.submitted) return;

    this.state.scaleScore = score;
    this.state.starRating = Math.round(score / 2);
    this.state.touched['rating'] = true;
    this.validateField('rating');
    this.updateStarsFromScale();
    this.updateRatingText();
  }

  private updateStarsFromScale(): void {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
      if (index < this.state.starRating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  private updateScaleButtons(): void {
    const btns = document.querySelectorAll('.scale-btn');
    btns.forEach((btn) => {
      const value = parseInt(btn.getAttribute('data-value') || '0');
      if (value === this.state.scaleScore) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  private validateField(field: string): void {
    const errors: Record<string, string> = { ...this.state.errors };

    switch (field) {
      case 'name':
        if (!this.state.name.trim()) {
          errors['name'] = 'Name is required';
        } else if (this.state.name.length < 2) {
          errors['name'] = 'Name must be at least 2 characters';
        } else if (this.state.name.length > 50) {
          errors['name'] = 'Name must be less than 50 characters';
        } else {
          delete errors['name'];
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        if (!this.state.email.trim()) {
          errors['email'] = 'Email is required';
        } else if (!emailRegex.test(this.state.email)) {
          errors['email'] = 'Please enter a valid email address';
        } else {
          delete errors['email'];
        }
        break;

      case 'notes':
        if (this.state.notes.length > 1000) {
          errors['notes'] = 'Notes must be less than 1000 characters';
        } else {
          delete errors['notes'];
        }
        break;

      case 'rating':
        if (this.state.starRating === 0) {
          errors['rating'] = 'Please select a rating';
        } else {
          delete errors['rating'];
        }
        break;
    }

    this.state.errors = errors;
  }

  validateAll(): boolean {
    this.validateField('name');
    this.validateField('email');
    this.validateField('rating');
    this.validateField('notes');

    return Object.keys(this.state.errors).length === 0;
  }

  async onSubmit(): Promise<void> {
    if (this.state.loading || this.state.submitted) return;

    this.state.touched = {
      name: true,
      email: true,
      notes: true,
      rating: true
    };

    if (!this.validateAll()) {
      this.scrollToFirstError();
      this.shakeForm();
      return;
    }

    this.state.loading = true;

    // استخدام FormSubmit (مجاني ويعمل فوراً)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://formsubmit.co/abdullah.ramadanali@gmail.com';
    form.style.display = 'none';
    form.target = '_blank';

    const fields = {
      name: this.state.name,
      email: this.state.email,
      'Rating (stars)': `${this.state.starRating}/5`,
      'Rating (score)': `${this.state.scaleScore}/10`,
      message: this.state.notes || 'No comments',
      _subject: `📊 Portfolio Review from ${this.state.name}`,
      _captcha: 'false',
      _template: 'table',
      _replyto: this.state.email
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);

    // محاكاة الإرسال وعرض النجاح
    setTimeout(() => {
      form.submit();
      this.state.submitted = true;
      this.state.loading = false;
      this.updateSuccessMeta();
      this.playSuccessAnimation();
      this.showToast('✅ تم إرسال تقييمك بنجاح! شكراً لك 🙏', 'success');
      localStorage.removeItem('review_draft');
    }, 500);

    setTimeout(() => form.remove(), 2000);
  }



  private saveToLocalBackup(data: any): void {
    const pending = JSON.parse(localStorage.getItem('pending_reviews') || '[]');
    pending.push({
      ...data,
      failedAt: new Date().toISOString(),
      retryCount: 0
    });
    localStorage.setItem('pending_reviews', JSON.stringify(pending));
    console.log('تم حفظ التقييم محلياً كنسخة احتياطية');
  }

  private scrollToFirstError(): void {
    const firstError = document.querySelector('.field-error.visible');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private shakeForm(): void {
    const card = document.querySelector('.form-card');
    if (card) {
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 500);
    }
  }

  private playSuccessAnimation(): void {
    const confettiColors = ['#00d4ff', '#7c3aed', '#10b981', '#f59e0b'];
    for (let i = 0; i < 50; i++) {
      const particle = this.renderer.createElement('div');
      this.renderer.addClass(particle, 'confetti-particle');
      this.renderer.setStyle(particle, 'position', 'fixed');
      this.renderer.setStyle(particle, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(particle, 'top', '50%');
      this.renderer.setStyle(particle, 'width', `${Math.random() * 8 + 4}px`);
      this.renderer.setStyle(particle, 'height', `${Math.random() * 8 + 4}px`);
      this.renderer.setStyle(particle, 'background', confettiColors[Math.floor(Math.random() * confettiColors.length)]);
      this.renderer.setStyle(particle, 'borderRadius', Math.random() > 0.5 ? '50%' : '0');
      this.renderer.setStyle(particle, 'animation', `confettiFall ${Math.random() * 2 + 1}s linear forwards`);
      this.renderer.setStyle(particle, 'zIndex', '1000');
      this.renderer.setStyle(particle, 'pointerEvents', 'none');
      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 2000);
    }
  }

  private updateSuccessMeta(): void {
    const meta = document.getElementById('sMeta');
    if (meta) {
      const date = new Date().toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      meta.innerHTML = `⭐ ${this.state.starRating}/5 نجوم • ${this.state.scaleScore}/10 نقاط • ${date}`;
    }
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    const toast = this.renderer.createElement('div');
    this.renderer.addClass(toast, 'toast-notification');
    this.renderer.addClass(toast, type);
    this.renderer.setStyle(toast, 'position', 'fixed');
    this.renderer.setStyle(toast, 'bottom', '20px');
    this.renderer.setStyle(toast, 'right', '20px');
    this.renderer.setStyle(toast, 'padding', '12px 20px');
    this.renderer.setStyle(toast, 'borderRadius', '10px');
    this.renderer.setStyle(toast, 'background', type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)');
    this.renderer.setStyle(toast, 'color', 'white');
    this.renderer.setStyle(toast, 'zIndex', '1000');
    this.renderer.setStyle(toast, 'animation', 'slideInRight 0.3s ease');
    this.renderer.setStyle(toast, 'boxShadow', '0 4px 15px rgba(0,0,0,0.2)');
    this.renderer.setStyle(toast, 'fontFamily', 'var(--ff-mono)');
    this.renderer.setStyle(toast, 'fontSize', '0.85rem');
    this.renderer.setStyle(toast, 'fontWeight', '500');
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  resetForm(): void {
    this.state = {
      name: '',
      email: '',
      notes: '',
      starRating: 0,
      scaleScore: 0,
      loading: false,
      submitted: false,
      errors: {},
      touched: {}
    };

    // Reset UI elements
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.classList.remove('active'));

    const scaleBtns = document.querySelectorAll('.scale-btn');
    scaleBtns.forEach(btn => btn.classList.remove('active'));

    const ratingText = document.getElementById('rText');
    if (ratingText) {
      ratingText.textContent = 'Click a star to rate';
      ratingText.classList.remove('rated');
    }

    // Clear error messages
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(el => el.classList.remove('visible'));

    this.showToast('🔄 تم إعادة تعيين النموذج', 'success');
  }

  getStarClass(index: number): string {
    return index < this.state.starRating ? 'star active' : 'star';
  }
}