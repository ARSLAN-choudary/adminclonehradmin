import { ChangeDetectionStrategy, Component } from '@angular/core';



@Component({
    selector: 'app-ui-stickynote',
    templateUrl: './ui-stickynote.component.html',
    styleUrl: './ui-stickynote.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class UiStickynoteComponent {
  notes = [];
}
