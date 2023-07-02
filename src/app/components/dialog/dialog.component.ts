import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() header: string | undefined;
  @Input() message: string | undefined;
  @Input() error: boolean | undefined;

  constructor() {}
}
