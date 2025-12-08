import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark' = 'light';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadTheme();
  }

  private loadTheme(): void {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      this.setTheme(storedTheme as 'light' | 'dark');
    } else {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  private setTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
    localStorage.setItem('theme', theme);
  }

  public toggleTheme(): void {
    this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
  }

  public get currentTheme$(): 'light' | 'dark' {
    return this.currentTheme;
  }
}
