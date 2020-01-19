import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AcfServiceService} from './acf-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acf-ui';
  underlyingTree: any;
  form = new FormGroup({
    n: new FormControl('2'),
    t: new FormControl('2'),
    poc_0: new FormControl('1600'),
    sigma: new FormControl('0.36'),
  });

  constructor(private acfServiceService: AcfServiceService) {
  }

  getUnderyingTree() {
    console.log('AppComponent - getUnderyingTree()');
    this.acfServiceService.getUnderlyingTree(this.form.get('n').value,
                                              this.form.get('t').value,
                                              this.form.get('poc_0').value,
                                              this.form.get('sigma').value).subscribe(ut => {
      this.underlyingTree = ut;
      console.log('AppComponent - getUnderyingTree() - received data: ', this.underlyingTree);
    });
  }
}
