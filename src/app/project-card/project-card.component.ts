import {Component, Input, OnInit, Sanitizer} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.sass']
})
export class ProjectCardComponent implements OnInit {

  @Input() title: string;
  @Input() subtitle: string;
  @Input() duration: string;
  @Input() imageUrl: string;
  @Input() videoUrl: string;
  @Input() youtubeId: string;
  @Input() projectLogoUrl: string;
  @Input() content: string;
  @Input() delay: number;
  @Input() role: string;

  show = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.delay) {
      this.show = true;
    } else {
      setTimeout(() => {
        this.show = true;
      }, this.delay);
    }
  }

  safeYoutubeUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.youtubeId}`);
  }
}
