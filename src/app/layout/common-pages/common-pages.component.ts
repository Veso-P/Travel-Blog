import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-common-pages',
    templateUrl: './common-pages.component.html',
    styleUrls: ['./common-pages.component.css']
})
export class CommonPagesComponent implements OnInit {
    about: boolean = false;
    contact: boolean = false;
    page404: boolean = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        const page = this.route.snapshot.data['page'];
        // console.log('The page is:' + page); // Use for DEBUGGING!

        switch (page) {
            case 'about': this.about = true; break;
            case 'contact': this.contact = true; break;
            default: this.page404 = true;
        }
        
    }

}