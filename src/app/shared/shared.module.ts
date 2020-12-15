import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components:
import { AlertComponent } from './alert/alert.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        AlertComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule ,
        FormsModule,
        ReactiveFormsModule       
    ],
    exports: [
        AlertComponent,
        SpinnerComponent,
        
        CommonModule,
        FormsModule,
        ReactiveFormsModule, 
        RouterModule
    ]
})

export class SharedModule { }