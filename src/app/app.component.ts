import { Component } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {AcfServiceService} from './acf-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'acf-ui';
  underlyingTree: any;
  cube: any;
  form: FormGroup;

  constructor(private acfServiceService: AcfServiceService) {

    const listOfStrategies = new FormArray([]);

    this.form = new FormGroup({
      n: new FormControl('2'),
      t: new FormControl('2'),
      poc_0: new FormControl('1600'),
      sigma: new FormControl('0.36'),
      rf: new FormControl('0.05'),
      pop_0: new FormControl('350'),
      aoc: new FormControl('0.15'),
      coo: new FormControl('100'),
      // gainOrLoss1: new FormControl('0'),
      // salesLevel1: new FormControl('10000'),
      // gainOrLoss2: new FormControl('-250000'),
      // salesLevel2: new FormControl('20000'),
      // gainOrLoss3: new FormControl('0'),
      // salesLevel3: new FormControl('0'),
      listOfStrategies
    });

    (this.form.get('listOfStrategies') as FormArray).push(
      new FormGroup({
        gol: new FormControl(),
        sl: new FormControl()
      })
    );
  }


  onAddStrategy() {
    (this.form.get('listOfStrategies') as FormArray).push(
      new FormGroup({
        gol: new FormControl(),
        sl: new FormControl()
      })
    );
  }

  onDeleteStrategy(index: number) {
    (this.form.get('listOfStrategies') as FormArray).removeAt(index);
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

  getCube() {
    console.log('AppComponent - getCube()');
    const lot = []; // list of strategies
    for (const strategy of (this.form.get('listOfStrategies') as FormArray).controls) {
      lot.push({
        gainOrLoss: strategy.value.gol,
        salesLevel: strategy.value.sl
      });
    }
    this.acfServiceService.getCube(this.form.get('n').value,
      this.form.get('t').value,
      this.form.get('poc_0').value,
      this.form.get('sigma').value,
      this.form.get('rf').value,
      this.form.get('pop_0').value,
      this.form.get('aoc').value,
      this.form.get('coo').value,
      lot
      ).subscribe(cube => {
      this.cube = cube;
      console.log('AppComponent - getCube() - received data: ', this.cube);
    });
  }
}
