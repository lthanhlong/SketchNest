
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fabric } from 'fabric'
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';

import { Color } from 'fabric/fabric-impl';
import { bufferToggle } from 'rxjs/operators';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
@Component({
  selector: 'app-draw',
  templateUrl:'./draw.component.html',
  styleUrls: ['./draw.component.scss'],
})

export class DrawComponent implements OnInit, OnDestroy {
  // @HostListener('keypress', ['$event.target'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   console.log(event);
  //   let x = event.keyCode;
  //   if (x === 27) {
  //       console.log('Escape!');
  //   }
  // }
  brush: any;
  canvas: any;
  circle: any;
  image: any;
  normal: any;
  rect: any;
  currentMode: any;
  color: any;
  json: any;
  triangle: any;
  url: any;
  shapeColor: any;
  constructor(public dialog: MatDialog) { }
  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }
  ngOnInit(): void {
    this.canvas = new fabric.Canvas('canvas', {
      width: 1823,
      height: 735,
    });
    // this.keyboardEvents();
    //load canvas:
    // this.canvas.clear();
    // this.canvas.loadFromJSON(this.json, function () {
    //   this.canvas.renderAll();
    // });
    //xac dinh vi tri con chuot trong canvas
    // this.canvas.on('mouse:move', function (event) {
    //   console.log(event.e.clientX, event.e.clientY);
    // })



  }
  ngOnDestroy() {
    //xuat canva thanh JSON
    this.json = JSON.stringify(this.canvas.toJSON());
  }
  //default
  pointer() {
    this.canvas.isDrawingMode = false;
  }
  chooseColor() {
    this.color = document.getElementById('color');
    return this.color.value;

  }

  startDrawing() {
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.color = this.chooseColor();
    this.canvas.freeDrawingBrush.width = 14;
    fabric.Path.prototype.selectable = false;
  }
  // highlightPen() {
  //   this.canvas.isDrawingMode = true;
  //   this.canvas.setActiveObject(fabric.Path);
  //   var activeObj = this.canvas.getActiveObject();
  //   activeObj.setOpacity(1);
  //   activeObj.animate('opacity', '0', {
  //     duration: 1000,
  //     onChange: this.canvas.renderAll.bind(this.canvas),
  //     onComplete: function () {
  //       this.canvas.remove(activeObj);
  //     }
  //   });
  // }
  eraser() {
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.color = 'white';
    this.canvas.freeDrawingBrush.width = 14;
    fabric.Path.prototype.selectable = false;
    console.log(this.json);
  }


  picture(event) {
    this.canvas.isDrawingMode = false;
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        // console.log(this.url)
        fabric.Image.fromURL(this.url, (test) => {
          this.canvas.add(test);
          this.canvas.renderAll();
        })
      }
    }
  }
  textField() {
    this.canvas.add(new fabric.IText('lorem ipsum', {
      fontFamily: 'arial black',
      left: 100,
      top: 100,
    }));
  }
  ///Keyboard events
  keyboardEvents() {
    this.canvas.document.onkeydown = function (e) {
      switch (e.keyCode) {
        case 46://xoa
          alert('deleted')
          // if (this.canvas.getActiveObject()) {
          this.canvas.getActiveObject().remove();

          break;

      }
    }
  }


  // /Shape
  deleteShape() {
    this.canvas.isDrawingMode = false;
    this.canvas.remove(this.canvas.getActiveObject());


    console.log(this.json);
  }
  drawCircle() {
    this.canvas.isDrawingMode = false;
    this.circle = new fabric.Circle({
      radius: 20,
      fill: this.chooseColor(),
    });
    this.canvas.add(this.circle);
    this.canvas.renderAll();
    ///////////////////
    // let x,y;
    // this.canvas.isDrawingMode = false;

    // await this.canvas.on('mouse:down', function (event) {



    // x=event.e.clientX
    // y=event.e.clientY
    // this.circle = new fabric.Circle({
    //   radius: 50,
    //   fill: '',
    //   stroke: 'red',
    //   strokeWidth: 3,
    //   left: x,
    //   top: y,
    // });
    // this.canvas.add(this.circle);

    // this.canvas.renderAll();


    //   })
    // };

    ///////////////////////
  }
  drawRectangle() {
    this.canvas.isDrawingMode = false;
    this.rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: this.chooseColor(),
    });
    this.canvas.add(this.rect);
    this.canvas.renderAll();
  }
  drawTriangle() {
    this.canvas.isDrawingMode = false;
    this.triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      fill: 'blue',
    })

  }

  //ShapeOption
  shapeOption() {
    this.shapeColor=document.getElementById('shapecolor');
    // this.canvas.on('selected',function(){
    //   this.canvas.fill(this.shapeColor.value);
    // })
    // this.canvas.getActiveObject().set("fill",this.shapeColor.value);
    


  }

}

