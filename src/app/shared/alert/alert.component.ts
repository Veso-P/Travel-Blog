import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core"

@Component ({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
    @Input() message: string;
    @Output() close = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }

    ngOnInit() {
        setTimeout(() => {
            this.onClose()
        }, 4000);
    }

}