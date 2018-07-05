import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog,
        MatDialogRef,
        MatSnackBar,
        MatButtonModule,
        MatIcon } from '@angular/material';
import { Subscription, Subject } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'jquery';
import 'jquery-ui-dist/jquery-ui';
import * as $ from 'jquery';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss',
    './../../node_modules/@angular/material/prebuilt-themes/indigo-pink.css'
  ],
  templateUrl: 'app.component.html',
  providers: []
})
export class AppComponent implements OnInit {
  @ViewChild ('infoGraphicBlock') public infoGraphicBlock: any;
  @ViewChild ('infoGraphicCanvas') public infoGraphicCanvas: any;
  @ViewChild ('sidenav') public sidenav: any;
  // for activities
  @ViewChild ('activitySlide') public activitySlide: any;
  @ViewChild ('activityStartTimeEl') public activityStartTimeEl: any;
  @ViewChild ('activityEndTimeEl') public activityEndTimeEl: any;
  @ViewChild ('activityColorEl') public activityColorEl: any;
  @ViewChild ('activityTitleEl') public activityTitleEl: any;
  // for commonPeriods
  @ViewChild ('commonPeriodStartTimeEl') public commonPeriodStartTimeEl: any;
  @ViewChild ('commonPeriodEndTimeEl') public commonPeriodEndTimeEl: any;
  @ViewChild ('commonPeriodTitleEl') public commonPeriodTitleEl: any;
  // for periods
  @ViewChild ('periodSlide') public periodSlide: any;
  @ViewChild ('periodStartTimeEl') public periodStartTimeEl: any;
  @ViewChild ('periodEndTimeEl') public periodEndTimeEl: any;
  @ViewChild ('periodTitleEl') public periodTitleEl: any;
  // for signedPoints
  @ViewChild ('signedPointSlide') public signedPointSlide: any;
  @ViewChild ('signedPointTimeEl') public signedPointTimeEl: any;
  @ViewChild ('signedPointTitleEl') public signedPointTitleEl: any;

  public startPozX: number = 50;
  public startHour: number = 5;
  public scaleWidth: number;
  public scaleHeight: number = 50;
  public scaleMinHeight = this.scaleHeight - 15;
  public simpleScaleTriggerWidth = 10; // without scale for 15 and 45 minutes
  public scheduleSelected: string = 'schedule0';
  // for activities
  public activitySelected: string = 'activity0';
  public activityTitleValue: string = '';
  public activityStartTime: string = '';
  public activityEndTime: string = '';
  public activityColor: string = '';
  public activityToHighlight: boolean = false;
  public activities;
  // for commonPeriods
  public commonPeriodSelected: string = 'commonPeriod0';
  public commonPeriodTitleValue: string = '';
  public commonPeriodStartTime: string = '';
  public commonPeriodEndTime: string = '';
  public commonPeriods;
  // for periods
  public periodSelected: string = 'period0';
  public periodTitleValue: string = '';
  public periodStartTime: string = '';
  public periodEndTime: string = '';
  public periodBackground: boolean = false;
  public periods;
  // for signedPoints
  public signedPointSelected: string = 'signedPoint0';
  public signedPointTitleValue: string = '';
  public signedPointTime: string = '';
  public signedPointAlign: boolean = false;
  public signedPoints;

  public sidenavType: string = 'commonPeriods';

  // початкові дані для побудови інфографіки
  public infoGraphicData = {
    commonPeriods: [
      {title: 'Heavy traffic \n on the way to work', startTime: '7:30', endTime: '10:00'},
      {title: 'SCRUM \n Stand-Up Meeting', startTime: '10:00', endTime: '10:30'},
      {title: 'Heavy traffic \n on the way to home', startTime: '17:00', endTime: '19:30'}
    ],
    schedules: [
      {title: 'Regular',
      signedPoints: [
        {time: '10:00', title: 'Work Starts', align: 'right'},
        {time: '19:00', title: 'Work Ends', align: 'left'}
      ],
      periods: [
        {title: 'Public \n Transport', startTime: '09:00', endTime: '10:00', background: 'false'},
        {title: 'Activity at Work', startTime: '10:00', endTime: '19:00', background: 'true'},
        {title: 'Public \n Transport', startTime: '19:00', endTime: '20:00', background: 'false'},
        {title: 'Activity at Home', startTime: '20:00', endTime: '23:30', background: 'true'}
      ],
      activities: [
        {title: 'Sleep 8:30', startTime: '23:30', endTime: '08:00',
          color: '#0094f5', toHighlight: 'false'},
        {title: 'Wake Up', startTime: '08:00', endTime: '08:00',
          color: '#0094f5', toHighlight: 'false'},
        {title: '', startTime: '08:00', endTime: '10:00',
          color: '#fb4d8c', toHighlight: 'false'},
        {title: 'Stand-Up 0:30', startTime: '10:00', endTime: '10:30',
          color: '#fb4d8c', toHighlight: 'true'},
        {title: 'Coffee 0:15', startTime: '10:30', endTime: '10:45',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Back to Flow 0:15', startTime: '10:45', endTime: '11:00',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Flow 1:00', startTime: '11:00', endTime: '12:00',
          color: '#02cb03', toHighlight: 'true'},
        {title: 'Lunch 0:45', startTime: '12:00', endTime: '12:45',
          color: '#fb4d8c', toHighlight: 'true'},
        {title: 'Back to Flow \n after Lunch 1:00', startTime: '12:45', endTime: '13:45',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Flow 2:15', startTime: '13:45', endTime: '16:00',
          color: '#02cb03', toHighlight: 'true'},
        {title: 'Meal 0:15', startTime: '16:00', endTime: '16:15',
          color: '#fb4d8c', toHighlight: 'true'},
        {title: 'Back to Flow 0:30', startTime: '16:15', endTime: '16:45',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Flow 2:15', startTime: '16:45', endTime: '19:00',
          color: '#02cb03', toHighlight: 'true'},
        {title: '', startTime: '19:00', endTime: '20:00',
          color: '#fb4d8c', toHighlight: 'false'},
        {title: 'Time with kid \n and family 2:30', startTime: '20:00', endTime: '22:30',
          color: '#02cb03', toHighlight: 'true'},
        {title: '', startTime: '22:30', endTime: '22:30',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Personal time \n before sleep 1:00', startTime: '22:30', endTime: '23:30',
          color: '#fde82f', toHighlight: 'true'}
      ]},
      {title: 'Optimized',
      signedPoints: [
        {time: '07:15', title: 'Work Starts', align: 'right'},
        {time: '16:15', title: 'Work Ends', align: 'left'}
      ],
      periods: [
        {title: 'Car', startTime: '06:45', endTime: '07:15', background: 'false'},
        {title: 'Activity at Work', startTime: '07:15', endTime: '16:15', background: 'true'},
        {title: 'Car', startTime: '16:15', endTime: '17:00', background: 'false'},
        {title: 'Activity at Home', startTime: '17:00', endTime: '22:30', background: 'true'},
      ],
      activities: [
        {title: 'Sleep 7:30', startTime: '22:30', endTime: '06:00',
          color: '#0094f5', toHighlight: 'false'},
        {title: 'Wake Up', startTime: '06:00', endTime: '06:00',
          color: '#0094f5', toHighlight: 'false'},
        {title: '', startTime: '06:00', endTime: '07:15',
          color: '#fb4d8c', toHighlight: 'false'},
        {title: 'Coffee 0:15', startTime: '07:15', endTime: '07:30',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Most Productive \n Flow 2:30', startTime: '07:30', endTime: '10:00',
          color: '#02cb03', toHighlight: 'true'},
        {title: 'Stand-Up 0:30', startTime: '10:00', endTime: '10:30',
          color: '#fb4d8c', toHighlight: 'true'},
        {title: 'Back to Flow 0:15', startTime: '10:30', endTime: '10:45',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Flow 1:15', startTime: '10:45', endTime: '12:00',
          color: '#02cb03', toHighlight: 'true'},
        {title: 'Lunch 0:45', startTime: '12:00', endTime: '12:45',
          color: '#fb4d8c', toHighlight: 'true'},
        {title: 'Back to Flow \n after Lunch 1:00', startTime: '12:45', endTime: '13:45',
          color: '#fde82f', toHighlight: 'true'},
        {title: 'Flow 2:30', startTime: '13:45', endTime: '16:15',
          color: '#02cb03', toHighlight: 'true'},
        {title: '', startTime: '16:15', endTime: '17:00',
          color: '#fb4d8c', toHighlight: 'false'},
        {title: 'Time with kid \n & family 5:30', startTime: '17:00', endTime: '22:30',
          color: '#02cb03', toHighlight: 'true'}
      ]}
    ]
  };

  constructor() {
    this.setNewData();
  }

  public setNewData(newFileFlag: boolean = false) {
    let scheduleIndex = parseInt(this.scheduleSelected.substring(8), 10);
    if (newFileFlag) {
      this.commonPeriods = this.infoGraphicData['commonPeriods'];
      this.activitySelected = 'activity-1';
      this.periodSelected = 'period-1';
      this.signedPointSelected = 'signedPoint-1';
      this.commonPeriodSelected = 'commonPeriod-1';

    } else {

      // for activities
      this.activities = this.infoGraphicData['schedules'][scheduleIndex]['activities'];
      let activityIndex = parseInt(this.activitySelected.substring(8), 10);
      this.activityTitleValue = this.activities[activityIndex]['title'];
      this.activityStartTime = this.activities[activityIndex]['startTime'];
      this.activityEndTime = this.activities[activityIndex]['endTime'];
      this.activityColor = this.activities[activityIndex]['color'];
      this.activityToHighlight = (this.activities[activityIndex]['toHighlight'] === 'true');

      // for periods
      this.periods = this.infoGraphicData['schedules'][scheduleIndex]['periods'];
      let periodIndex = parseInt(this.periodSelected.substring(6), 10);
      this.periodTitleValue = this.periods[periodIndex]['title'];
      this.periodStartTime = this.periods[activityIndex]['startTime'];
      this.periodEndTime = this.periods[activityIndex]['endTime'];
      this.periodBackground = (this.periods[periodIndex]['background'] === 'true');

      // for signedPoints
      this.signedPoints = this.infoGraphicData['schedules'][scheduleIndex]['signedPoints'];
      let signedPointIndex = parseInt(this.signedPointSelected.substring(11), 10);
      this.signedPointTitleValue = this.signedPoints[signedPointIndex]['title'];
      this.signedPointTime = this.signedPoints[activityIndex]['time'];
      this.signedPointAlign = (this.signedPoints[signedPointIndex]['align'] === 'left');

      // for commonPeriods
      this.commonPeriods = this.infoGraphicData['commonPeriods'];
      let commonPeriodIndex = parseInt(this.commonPeriodSelected.substring(12), 10);
      this.commonPeriodTitleValue = this.commonPeriods[commonPeriodIndex]['title'];
      this.commonPeriodStartTime = this.commonPeriods[commonPeriodIndex]['startTime'];
      this.commonPeriodEndTime = this.commonPeriods[commonPeriodIndex]['endTime'];
    }
  }

  //  функція побудови частини інфографіки - Спільних періодів для двох днів
  public buildCommonPeriods(el: HTMLCanvasElement, startPozX: number, areaWidth: number,
                            startPozY: number, areaHeight: number,
                            title: string, step: number = 0) {
    let infoGraphicCtx = el.getContext('2d');

    function createPinstripeCanvas() {

      const patternCanvas = document.createElement('canvas');
      const pctx = patternCanvas.getContext('2d');
      const canvasSideLength = 6 + step;
      const divisions = 4;

      patternCanvas.width = canvasSideLength;
      patternCanvas.height = canvasSideLength;
      pctx.fillStyle = '#f0ebeb';

      // Top line
      pctx.beginPath();
      pctx.moveTo(0, canvasSideLength * (1 / divisions));
      pctx.lineTo(canvasSideLength * (1 / divisions), 0);
      pctx.lineTo(0, 0);
      pctx.lineTo(0, canvasSideLength * (1 / divisions));
      pctx.fill();

      // Middle line
      pctx.beginPath();
      pctx.moveTo(canvasSideLength, canvasSideLength * (1 / divisions));
      pctx.lineTo(canvasSideLength * (1 / divisions), canvasSideLength);
      pctx.lineTo(0, canvasSideLength);
      pctx.lineTo(0, canvasSideLength * ((divisions - 1) / divisions));
      pctx.lineTo(canvasSideLength * ((divisions - 1) / divisions), 0);
      pctx.lineTo(canvasSideLength, 0);
      pctx.lineTo(canvasSideLength, canvasSideLength * (1 / divisions));
      pctx.fill();

      // Bottom line
      pctx.beginPath();
      pctx.moveTo(canvasSideLength, canvasSideLength * ((divisions - 1) / divisions));
      pctx.lineTo(canvasSideLength * ((divisions - 1) / divisions), canvasSideLength);
      pctx.lineTo(canvasSideLength, canvasSideLength);
      pctx.lineTo(canvasSideLength, canvasSideLength * ((divisions - 1) / divisions));
      pctx.fill();

      return patternCanvas;
    }

    infoGraphicCtx.fillStyle = infoGraphicCtx.createPattern(createPinstripeCanvas(), 'repeat');
    infoGraphicCtx.fillRect(startPozX, startPozY, areaWidth, areaHeight);

    infoGraphicCtx.save();
    infoGraphicCtx.rotate(-Math.PI / 2);
    infoGraphicCtx.font = '10px Arial';
    infoGraphicCtx.fillStyle = 'gray';
    let titleArray = title.split('\n');
    let maxTextIndex = 0;
    let maxTextSize = 0;
    for (let k = 0; k < titleArray.length; k++) {
      if (titleArray[k].length >= maxTextSize) {
        maxTextIndex = k;
        maxTextSize = titleArray[k].length;
      }
    }

    let textAfterTitle = infoGraphicCtx.measureText(titleArray[maxTextIndex].toUpperCase()).width;
    for (let k = 0; k < titleArray.length; k++) {
      let currentTextWidth = infoGraphicCtx.measureText(titleArray[k].toUpperCase()).width;
      infoGraphicCtx.fillText(titleArray[k].toUpperCase(),
                              startPozY - (Math.round(currentTextWidth / 2)) - 100,
                              startPozX + Math.round(areaWidth / 2) + 5
                              - (titleArray.length - 1) * 10 + k * 10);
    }
    infoGraphicCtx.restore();

  }

  //  функція побудови частини інфографіки - шкали та відображенням на ній годин
  //  при зменшенні шкали зникаються шкали для 15 та 45 хвилин
  public buildScale(el: HTMLCanvasElement, startPozY: number,
                    infoGraphicTitle: string, signedPoints: object[]) {

    let infoGraphicCtx = el.getContext('2d');
    let hourTitleFontSize = Math.round(this.scaleWidth / 5);

    infoGraphicCtx.fillStyle = 'black';

    // title text
    infoGraphicCtx.font = 'bold 22px Arial';
    infoGraphicCtx.fillText(infoGraphicTitle, this.startPozX, startPozY - 60);
    let textAfterTitle = infoGraphicCtx.measureText(infoGraphicTitle).width;
    infoGraphicCtx.font = '22px Arial';
    infoGraphicCtx.fillText('Schedule', this.startPozX + textAfterTitle + 16, startPozY - 60);

    for (let signedPoint of signedPoints) {
      infoGraphicCtx.strokeStyle = 'lightgray';
      infoGraphicCtx.fillStyle = '#bc304d';
      infoGraphicCtx.lineWidth = 1;
      infoGraphicCtx.font = 'bold ' + (hourTitleFontSize + 3) + 'px Arial';
      let textWidth = infoGraphicCtx.measureText(signedPoint['time']).width; // center align title
      let timeValue = this.timeToNumber(signedPoint['time']);
      let leftPoz: number = 0;

      if (timeValue === this.startHour) {
        leftPoz = this.startPozX + (timeValue - this.startHour) * this.scaleWidth;
        let leftPoz2 = this.startPozX + (timeValue + 24 - this.startHour) * this.scaleWidth;
        infoGraphicCtx.fillText(signedPoint['time'],
                                leftPoz - Math.round(textWidth / 2),
                                startPozY - 30);
        infoGraphicCtx.fillText(signedPoint['time'],
                                leftPoz2 - Math.round(textWidth / 2),
                                startPozY - 30);

        // sign title
        infoGraphicCtx.font = 'bold ' + hourTitleFontSize + 'px Arial';
        let textTitleWidth = infoGraphicCtx.measureText(signedPoint['title']).width;
        if (signedPoint['align'] === 'left') {
          infoGraphicCtx.fillText(signedPoint['title'], leftPoz
                                  - Math.round(textWidth / 2) - textTitleWidth
                                  - Math.round(hourTitleFontSize / 2), startPozY - 30);
        } else {
          infoGraphicCtx.fillText(signedPoint['title'], leftPoz
                                  + Math.round(textWidth / 2) + Math.round(hourTitleFontSize / 2),
                                  startPozY - 30);
        }

        // sign title 2

        if (signedPoint['align'] === 'left') {
          infoGraphicCtx.fillText(signedPoint['title'], leftPoz2
                                  - Math.round(textWidth / 2) - textTitleWidth
                                  - Math.round(hourTitleFontSize / 2), startPozY - 30);
        } else {
          infoGraphicCtx.fillText(signedPoint['title'], leftPoz2
                                  + Math.round(textWidth / 2) + Math.round(hourTitleFontSize / 2),
                                  startPozY - 30);
        }

        // line to scale
        infoGraphicCtx.beginPath();
        infoGraphicCtx.moveTo(leftPoz, startPozY - 25);
        infoGraphicCtx.lineTo(leftPoz, startPozY + this.scaleHeight / 2);
        infoGraphicCtx.closePath();
        infoGraphicCtx.stroke();

        // line2 to scale
        infoGraphicCtx.beginPath();
        infoGraphicCtx.moveTo(leftPoz2, startPozY - 25);
        infoGraphicCtx.lineTo(leftPoz2, startPozY + this.scaleHeight / 2);
        infoGraphicCtx.closePath();
        infoGraphicCtx.stroke();
      } else {
        if ((timeValue >= this.startHour) && (timeValue <= 24)) {
          leftPoz = this.startPozX + (timeValue - this.startHour) * this.scaleWidth;
        } else if ((timeValue <= this.startHour) && (timeValue >= 0)) {
          leftPoz = this.startPozX + (timeValue + 24 - this.startHour) * this.scaleWidth;
        }

        infoGraphicCtx.fillText(signedPoint['time'], leftPoz
                                - Math.round(textWidth / 2), startPozY - 30);

        infoGraphicCtx.font = 'bold ' + hourTitleFontSize + 'px Arial';
        let textTitleWidth = infoGraphicCtx.measureText(signedPoint['title']).width;
        if (signedPoint['align'] === 'left') {
          infoGraphicCtx.fillText(signedPoint['title'],
                                  leftPoz - Math.round(textWidth / 2) - textTitleWidth
                                  - Math.round(hourTitleFontSize / 2), startPozY - 30);
        } else {
          infoGraphicCtx.fillText(signedPoint['title'],
                                  leftPoz + Math.round(textWidth / 2)
                                  + Math.round(hourTitleFontSize / 2), startPozY - 30);
        }

        // line to scale
        infoGraphicCtx.beginPath();
        infoGraphicCtx.moveTo(leftPoz, startPozY - 25);
        infoGraphicCtx.lineTo(leftPoz, startPozY + this.scaleHeight / 2);
        infoGraphicCtx.closePath();
        infoGraphicCtx.stroke();
      }
    }

    for (let i = 0; i <= 24; i++) {
      // drawing hours
      infoGraphicCtx.beginPath();
      infoGraphicCtx.lineWidth = 2;
      infoGraphicCtx.moveTo(this.startPozX + i * this.scaleWidth, startPozY);
      infoGraphicCtx.lineTo(this.startPozX + i * this.scaleWidth, startPozY + this.scaleHeight);
      infoGraphicCtx.closePath();
      infoGraphicCtx.strokeStyle = 'black';
      infoGraphicCtx.fillStyle = 'black';
      infoGraphicCtx.stroke();
      infoGraphicCtx.font = hourTitleFontSize + 'px Arial';

      let signedPointFlag: boolean = false;
      for (let signedPoint of signedPoints) {
        if (this.startHour + i === this.timeToNumber(signedPoint['time'])) {
          signedPointFlag = true;
        }
      }
      if (!signedPointFlag) {
        if (this.startHour + i <= 24) {
          if (this.startHour + i < 10) {
            let textHour = '0' + (this.startHour + i) + ':00';
            let textWidth = infoGraphicCtx.measureText(textHour).width; // center align hour title
            infoGraphicCtx.fillText(textHour, this.startPozX
                                    - Math.round(textWidth / 2)
                                    + i * this.scaleWidth, startPozY - 10);
          } else {
            if (this.startHour + i === 12) {
              infoGraphicCtx.font = 'bold ' + (hourTitleFontSize + 2) + 'px Arial';
            }
            let textHour = (this.startHour + i) + ':00';
            let textWidth = infoGraphicCtx.measureText(textHour).width; // center align hour title
            infoGraphicCtx.fillText(textHour, this.startPozX
                                    - Math.round(textWidth / 2)
                                    + i * this.scaleWidth, startPozY - 10);
          }
        } else {
          if (this.startHour + i - 24 < 10) {
            let textHour = '0' + (this.startHour + i - 24) + ':00';
            let textWidth = infoGraphicCtx.measureText(textHour).width; // center align hour title
            infoGraphicCtx.fillText(textHour, this.startPozX
                                    - Math.round(textWidth / 2)
                                    + i * this.scaleWidth, startPozY - 10);
          } else {
            let textHour = (this.startHour + i - 24) + ':00';
            let textWidth = infoGraphicCtx.measureText(textHour).width; // center align hour title
            infoGraphicCtx.fillText(textHour, this.startPozX
                                    - Math.round(textWidth / 2)
                                    + i * this.scaleWidth, startPozY - 10);
          }
        }
      }

      if (i < 24) {
        infoGraphicCtx.strokeStyle = 'gray';
        infoGraphicCtx.lineWidth = 1;

        // drawing half hour
        if (Math.round(this.scaleWidth / 4) > this.simpleScaleTriggerWidth) {

          infoGraphicCtx.beginPath();
          infoGraphicCtx.moveTo(this.startPozX + Math.round(this.scaleWidth / 2)
                                + i * this.scaleWidth, startPozY);
          infoGraphicCtx.lineTo(this.startPozX + Math.round(this.scaleWidth / 2)
                                + i * this.scaleWidth, startPozY + this.scaleHeight);
          infoGraphicCtx.closePath();
          infoGraphicCtx.stroke();
        } else {

          infoGraphicCtx.beginPath();
          infoGraphicCtx.moveTo(this.startPozX + Math.round(this.scaleWidth / 2)
                                + i * this.scaleWidth, startPozY
                                + (this.scaleHeight - this.scaleMinHeight));
          infoGraphicCtx.lineTo(this.startPozX + Math.round(this.scaleWidth / 2)
                                + i * this.scaleWidth, startPozY + this.scaleHeight);
          infoGraphicCtx.closePath();
          infoGraphicCtx.stroke();
        }

        if (Math.round(this.scaleWidth / 4) > this.simpleScaleTriggerWidth) {
          // drawing 15 minutes

          infoGraphicCtx.beginPath();
          infoGraphicCtx.moveTo(this.startPozX + Math.round(this.scaleWidth / 4)
                                + i * this.scaleWidth, startPozY
                                + (this.scaleHeight - this.scaleMinHeight));
          infoGraphicCtx.lineTo(this.startPozX + Math.round(this.scaleWidth / 4)
                                + i * this.scaleWidth, startPozY + this.scaleHeight);
          infoGraphicCtx.closePath();
          infoGraphicCtx.stroke();

          // drawing 45 minutes

          infoGraphicCtx.beginPath();
          infoGraphicCtx.moveTo(this.startPozX + Math.round(3 * this.scaleWidth / 4)
                                + i * this.scaleWidth, startPozY
                                + (this.scaleHeight - this.scaleMinHeight));
          infoGraphicCtx.lineTo(this.startPozX + Math.round(3 * this.scaleWidth / 4)
                                + i * this.scaleWidth, startPozY + this.scaleHeight);
          infoGraphicCtx.closePath();
          infoGraphicCtx.stroke();
        }
      }
    }
  }

  // допоміжна функція для визначення розташування та
  // ширина конкретного відрізку інфографіки за данними часу
  public calculateTimePoz(timeStart: string, timeEnd: string) {
    let resultTimeStart: number = -1;
    let timePointsArray = [timeStart, timeEnd];
    let distanceArray = [];

    for (let timePoint of timePointsArray) {

      let timeArray = timePoint.split(':');
      let hour = parseInt(timeArray[0], 10);
      let minutes = 0;
      if (timeArray.length > 1) {
        minutes = Math.round(parseInt(timeArray[1], 10) * 100 / 60) / 100;
      }
      let resultTime = hour + minutes;
      if (resultTimeStart < 0) {
        resultTimeStart = resultTime;
      } else if ((resultTime < resultTimeStart)
                || ((resultTimeStart < 5) && (resultTime > 5))) {
        resultTime += 24;
      }
      let distanceHour = 0;
      if (resultTime >= this.startHour) {
        distanceHour = resultTime - this.startHour;
      } else {
        distanceHour = resultTime + 24 - this.startHour;
      }
      distanceArray.push(Math.round(this.startPozX + (this.scaleWidth) * distanceHour));
    }
    return [distanceArray[0], distanceArray[1] - distanceArray[0]];

  }

  // public calculateTimePozFake(timeStart: string, timeEnd: string) {
  //   let resultTimeStart: number = -1;
  //   let timePointsArray = [timeStart, timeEnd];
  //   let distanceArray = [];
  //   for (let timePoint of timePointsArray) {
  //     let timeArray = timePoint.split(':');
  //     let hour = parseInt(timeArray[0], 10);
  //     let minutes = 0;
  //     if (timeArray.length > 1) {
  //       minutes = Math.round(parseInt(timeArray[1], 10) * 100 / 60) / 100;
  //     }
  //     let resultTime = hour + minutes;
  //     if (resultTimeStart < 0) {
  //       resultTimeStart = resultTime;
  //     } else if ((resultTime < resultTimeStart)
  //               || ((resultTimeStart < 5) && (resultTime > 5))) {
  //       resultTime += 24;
  //     }
  //     let distanceHour = 0;
  //     if (resultTime >= this.startHour) {
  //       distanceHour = resultTime - this.startHour;
  //     } else {
  //       distanceHour = resultTime + 24 - this.startHour;
  //     }
  //     // distanceArray.push(Math.round(this.startPozX + (this.scaleWidth) * distanceHour));
  //     // distanceArray.push(resultTime);
  //     distanceArray.push(this.scaleWidth);
  //   }
  //   // return [parseInt(timeStart.split(':')[0], 10), parseInt(timeEnd.split(':')[0], 10)];
  //   // return [distanceArray[0], distanceArray[1] - distanceArray[0]];
  //   return [distanceArray[0], distanceArray[1]];
    
  // }

  public checkTimeValue(timeValue: string) {
    let timeArray = timeValue.split(':');
    let timeSumm: number;
    if (timeArray.length > 1) {
      timeSumm = parseInt(timeArray[0], 10)
                          + (Math.round(parseInt(timeArray[1], 10) * 100 / 60) / 100);
    } else {
      timeSumm = parseInt(timeArray[0], 10);
    }
    if (timeSumm > 24) {
      let normalTime = parseInt(timeArray[0], 10) - 24;
      let normalTimeText: string = normalTime.toString();
      if (normalTime < 10) {
        normalTimeText = '0' + normalTime;
      }
      return normalTimeText + ':' + timeArray[1];
    } else if (timeSumm < 0) {
      let normalTime = -1 * parseInt(timeArray[0], 10);
      let normalTimeText: string = normalTime.toString();
      if (normalTime < 10) {
        normalTimeText = '0' + normalTime;
      }
      return normalTimeText + ':' + timeArray[1];
    } else {
      return timeValue;
    }
  }

  // функція переводу годин до числового значення в дисятичній системі
  public timeToNumber(timeValue: string) {
    let timeValueArray = timeValue.split(':');
    let hours = parseInt(timeValueArray[0], 10);
    let minutes = 0;
    if (timeValueArray.length > 1) {
      minutes += Math.round(parseInt(timeValueArray[1], 10) * 100 / 60) / 100;
    }
    return hours + minutes;
  }

  //  функція побудови частини інфографіки - Періоду
  public buildPeriod(el: HTMLCanvasElement, pozX: number, periodWidth: number,
                     pozY: number, period: object) {
    let infoGraphicCtx = el.getContext('2d');
    let hourTitleFontSize = Math.round(this.scaleWidth / 5);
    let startPozY = pozY + this.scaleHeight;
    let startTimeValue = this.timeToNumber(period['startTime']);
    let endTimeValue = this.timeToNumber(period['endTime']);
    let timePeriodArray = [period['startTime'], period['endTime']];

    // drawing background if exist
    if (period['background'] === 'true') {
      infoGraphicCtx.fillStyle = '#eeeeee';
      infoGraphicCtx.fillRect(pozX, startPozY, periodWidth, Math.round(this.scaleHeight * 3 / 4));
    }

    for (let timePoint of timePeriodArray) {
      // drawing points of period
      let timePointValue = this.timeToNumber(timePoint);

      if ((timePointValue > 0) && (timePointValue < this.startHour)) {
        timePointValue += 24;
      }
      infoGraphicCtx.beginPath();
      infoGraphicCtx.lineWidth = 2;
      infoGraphicCtx.moveTo(this.startPozX + (timePointValue - this.startHour)
                            * this.scaleWidth, startPozY);
      infoGraphicCtx.lineTo(this.startPozX + (timePointValue - this.startHour)
                            * this.scaleWidth, startPozY + this.scaleHeight);
      infoGraphicCtx.closePath();
      infoGraphicCtx.strokeStyle = 'black';
      infoGraphicCtx.fillStyle = 'black';
      infoGraphicCtx.stroke();

      if ((timePointValue === this.startHour)
          || (pozX + periodWidth - 50 === 24 * this.scaleWidth)) {
        infoGraphicCtx.beginPath();
        infoGraphicCtx.moveTo(this.startPozX + 24 * this.scaleWidth, startPozY);
        infoGraphicCtx.lineTo(this.startPozX + 24 * this.scaleWidth, startPozY + this.scaleHeight);
        infoGraphicCtx.closePath();
        infoGraphicCtx.stroke();
      }

      if ((pozX === this.startPozX) && (startTimeValue !== this.startHour)) {
        infoGraphicCtx.beginPath();
        infoGraphicCtx.moveTo(this.startPozX, startPozY);
        infoGraphicCtx.lineTo(this.startPozX, startPozY + this.scaleHeight);
        infoGraphicCtx.closePath();
        infoGraphicCtx.stroke();
      }
    }

    infoGraphicCtx.font = '7px Arial';
    infoGraphicCtx.fillStyle = 'black';
    let titleArray = period['title'].split('\n');

    for (let k = 0; k < titleArray.length; k++) {
      let currentTextWidth = infoGraphicCtx.measureText(titleArray[k].toUpperCase()).width;
      infoGraphicCtx.fillText(titleArray[k].toUpperCase(), pozX + Math.round(periodWidth / 2)
                              - Math.round(currentTextWidth / 2), startPozY
                              + Math.round(this.scaleHeight * 3 / 8) + 3
                              - (titleArray.length - 1) * 4 + k * 10);
    }

  }

  //  функція побудови частини інфографіки - Події
  public buildActivity(el: HTMLCanvasElement, pozX: number, activityWidth: number,
                       pozY: number, activity: object) {
    let infoGraphicCtx = el.getContext('2d');
    let hourTitleFontSize = Math.round(this.scaleWidth / 5);
    let startPozY = pozY + Math.round(this.scaleHeight * 3 / 5);
    let startTimeValue = this.timeToNumber(activity['startTime']);
    let endTimeValue = this.timeToNumber(activity['endTime']);
    let timePeriodArray = [activity['startTime'], activity['endTime']];

    infoGraphicCtx.fillStyle = activity['color'];
    if (activity['toHighlight'] === 'true') {
      startPozY = pozY + Math.round(this.scaleHeight * 2 / 5);
      infoGraphicCtx.fillRect(pozX, startPozY, activityWidth, Math.round(this.scaleHeight * 3 / 5));
    } else {
      infoGraphicCtx.fillRect(pozX, startPozY, activityWidth, Math.round(this.scaleHeight * 2 / 5));
    }

    // title for activity
    infoGraphicCtx.save();
    infoGraphicCtx.rotate(-Math.PI / 2);
    infoGraphicCtx.font = '8px Arial';
    infoGraphicCtx.fillStyle = activity['color'];
    let titleArray = activity['title'].split('\n');
    let maxTextIndex = 0;
    let maxTextSize = 0;
    for (let k = 0; k < titleArray.length; k++) {
      if (titleArray[k].length >= maxTextSize) {
        maxTextIndex = k;
        maxTextSize = titleArray[k].length;
      }
    }

    let textAfterTitle = infoGraphicCtx.measureText(titleArray[maxTextIndex].toUpperCase()).width;
    for (let k = 0; k < titleArray.length; k++) {
      let currentTextWidth = infoGraphicCtx.measureText(titleArray[k].toUpperCase()).width;
      infoGraphicCtx.fillText(titleArray[k].toUpperCase(),
                              - startPozY - (Math.round(currentTextWidth))
                              - this.scaleHeight * 1.5,
                              pozX + Math.round(activityWidth / 2) + 5
                              - (titleArray.length - 1) * 10 + k * 10);
    }
    infoGraphicCtx.restore();
  }

  // Основна функція, яка будує всю інфографіку
  public infoGraphicDesigner() {
    let infoGraphicEl = this.infoGraphicCanvas.nativeElement;
    infoGraphicEl.height = 200 + 250 * this.infoGraphicData.schedules.length;
    this.scaleWidth = Math.round((infoGraphicEl.width - this.startPozX * 2) / 24); // for 1 hour

    let infoGraphicCtx = infoGraphicEl.getContext('2d');
    infoGraphicCtx.fillStyle = 'white';
    infoGraphicCtx.fillRect(0, 0, infoGraphicEl.width, infoGraphicEl.height);

    for (let j = 0; j < this.infoGraphicData.commonPeriods.length; j++) {
      let item = this.infoGraphicData.commonPeriods[j];
      item.startTime = this.checkTimeValue(item.startTime);
      item.endTime = this.checkTimeValue(item.endTime);

      let calculateTimePozArray = this.calculateTimePoz(item.startTime, item.endTime);
      let fullCommonPeriodWidth = calculateTimePozArray[0] + calculateTimePozArray[1];
      if (fullCommonPeriodWidth <= Math.round(this.scaleWidth * 24)) {
        this.buildCommonPeriods(infoGraphicEl, calculateTimePozArray[0], calculateTimePozArray[1],
                              10, infoGraphicEl.height - 20, item.title, j);
      } else {
        this.buildCommonPeriods(infoGraphicEl, calculateTimePozArray[0],
                                this.startPozX + Math.round(this.scaleWidth * 24)
                                - calculateTimePozArray[0],
                              10, infoGraphicEl.height - 20, item.title, j);
        this.buildCommonPeriods(infoGraphicEl, this.startPozX, calculateTimePozArray[0]
                                + calculateTimePozArray[1]
                                - Math.round(this.scaleWidth * 24) - this.startPozX,
                              10, infoGraphicEl.height - 20, item.title, j);
      }
    }

    for (let j = 0; j < this.infoGraphicData.schedules.length; j++) {
      let pozY = 250 + 250 * j;

      // build activities
      for (let activityItem of this.infoGraphicData.schedules[j].activities) {

        let calculateTimePozArray = this.calculateTimePoz(activityItem.startTime,
                                                          activityItem.endTime);
        let fullActivityWidth = calculateTimePozArray[0] + calculateTimePozArray[1];

        if (fullActivityWidth <= Math.round(this.scaleWidth * 24)) {
          this.buildActivity(infoGraphicEl, calculateTimePozArray[0],
                              calculateTimePozArray[1], pozY, activityItem);
        } else {
          this.buildActivity(infoGraphicEl, calculateTimePozArray[0],
                              this.startPozX + Math.round(this.scaleWidth * 24)
                              - calculateTimePozArray[0], pozY, activityItem);
          this.buildActivity(infoGraphicEl, this.startPozX, calculateTimePozArray[0]
                              + calculateTimePozArray[1] - Math.round(this.scaleWidth * 24)
                              - this.startPozX, pozY, activityItem);
          }
      }
      //

      // build scale
      this.buildScale(infoGraphicEl, pozY, this.infoGraphicData.schedules[j].title,
                      this.infoGraphicData.schedules[j].signedPoints);

      // build periods
      for (let periodItem of this.infoGraphicData.schedules[j].periods) {

        let calculateTimePozArray = this.calculateTimePoz(periodItem.startTime,
                                                          periodItem.endTime);
        let fullPeriodWidth = calculateTimePozArray[0] + calculateTimePozArray[1];

        if (fullPeriodWidth <= Math.round(this.scaleWidth * 24)) {
          this.buildPeriod(infoGraphicEl, calculateTimePozArray[0],
                            calculateTimePozArray[1], pozY, periodItem);
        } else {
          this.buildPeriod(infoGraphicEl, calculateTimePozArray[0], this.startPozX
                            + Math.round(this.scaleWidth * 24)
                            - calculateTimePozArray[0], pozY, periodItem);
          this.buildPeriod(infoGraphicEl, this.startPozX, calculateTimePozArray[0]
                            + calculateTimePozArray[1] - Math.round(this.scaleWidth * 24)
                            - this.startPozX, pozY, periodItem);
          }
      }
    }
  }

  // функція відображення бокової панелі для редагування інфографіки
  public showSidenav(type: string) {
    this.sidenavType = type;
    this.scheduleChanged();
    if (type === 'activities') {
      $('#sidenavContentTitle').text('Події');
      $('#activityBlock').show();
      $('#periodBlock').hide();
      $('#signedPointBlock').hide();
      $('#commonPeriodBlock').hide();
      this.activityChanged();
    } else if (type === 'commonPeriods') {
      $('#sidenavContentTitle').text('Спільні періоди');
      $('#activityBlock').hide();
      $('#periodBlock').hide();
      $('#signedPointBlock').hide();
      $('#commonPeriodBlock').show();
      this.commonPeriodChanged();
    } else if (type === 'periods') {
      $('#sidenavContentTitle').text('Періоди');
      $('#activityBlock').hide();
      $('#periodBlock').show();
      $('#signedPointBlock').hide();
      $('#commonPeriodBlock').hide();
      this.periodChanged();
    } else if (type === 'signedPoints') {
      $('#sidenavContentTitle').text('Відмічений час');
      $('#activityBlock').hide();
      $('#periodBlock').hide();
      $('#signedPointBlock').show();
      $('#commonPeriodBlock').hide();
      this.signedPointChanged();
    }
    this.sidenav.open();
  }

  public rebuildAfterSidenav() {
    let infoGraphicEl = this.infoGraphicCanvas.nativeElement;
    if (this.sidenav.opened) {
      infoGraphicEl.width = window.innerWidth - $('.info-graphic-sidenav').width();
    } else {
      infoGraphicEl.width = window.innerWidth;
    }
    this.infoGraphicDesigner();
  }

  public scheduleChanged() {
    let scheduleIndex = parseInt(this.scheduleSelected.substring(8), 10);
    this.activities = this.infoGraphicData['schedules'][scheduleIndex]['activities'];
    this.periods = this.infoGraphicData['schedules'][scheduleIndex]['periods'];
    this.signedPoints = this.infoGraphicData['schedules'][scheduleIndex]['signedPoints'];
    this.activityChanged();
    this.periodChanged();
    this.signedPointChanged();
  }

  public activityChanged() {
    if ((this.activities.length > 0) && (parseInt(this.activitySelected.substring(8), 10) > -1)) {
      let activityIndex = parseInt(this.activitySelected.substring(8), 10);
      this.activityTitleValue = this.activities[activityIndex]['title'];
      this.activityStartTime = this.activities[activityIndex]['startTime'];
      this.activityEndTime = this.activities[activityIndex]['endTime'];
      this.activityColor = this.activities[activityIndex]['color'];
      this.activityToHighlight = (this.activities[activityIndex]['toHighlight'] === 'true');
      this.activitySlide.checked = this.activityToHighlight;
    } else {
      this.activityTitleValue = '';
      this.activityStartTime = '12:00';
      this.activityEndTime = '12:00';
      this.activityColor = 'green';
      this.activityToHighlight = false;
      this.activitySlide.checked = this.activityToHighlight;
    }
  }

  public commonPeriodChanged() {
    if ((this.commonPeriods.length > 0)
        && (parseInt(this.commonPeriodSelected.substring(12), 10) > -1)) {
      let commonPeriodIndex = parseInt(this.commonPeriodSelected.substring(12), 10);
      this.commonPeriodTitleValue = this.commonPeriods[commonPeriodIndex]['title'];
      this.commonPeriodStartTime = this.commonPeriods[commonPeriodIndex]['startTime'];
      this.commonPeriodEndTime = this.commonPeriods[commonPeriodIndex]['endTime'];
    } else {
      this.commonPeriodTitleValue = '';
      this.commonPeriodStartTime = '12:00';
      this.commonPeriodEndTime = '12:00';
    }
  }

  public periodChanged() {
    if ((this.periods.length > 0) && (parseInt(this.periodSelected.substring(6), 10) > -1)) {
      let periodIndex = parseInt(this.periodSelected.substring(6), 10);
      this.periodTitleValue = this.periods[periodIndex]['title'];
      this.periodStartTime = this.periods[periodIndex]['startTime'];
      this.periodEndTime = this.periods[periodIndex]['endTime'];
      this.periodBackground = (this.periods[periodIndex]['background'] === 'true');
      this.periodSlide.checked = this.periodBackground;
    } else {
      this.periodTitleValue = '';
      this.periodStartTime = '12:00';
      this.periodEndTime = '12:00';
      this.periodBackground = false;
      this.periodSlide.checked = this.periodBackground;
    }
  }

  public signedPointChanged() {
    if ((this.signedPoints.length > 0)
        && (parseInt(this.signedPointSelected.substring(11), 10) > -1)) {
      let signedPointIndex = parseInt(this.signedPointSelected.substring(11), 10);
      this.signedPointTitleValue = this.signedPoints[signedPointIndex]['title'];
      this.signedPointTime = this.signedPoints[signedPointIndex]['time'];
      this.signedPointAlign = (this.signedPoints[signedPointIndex]['align'] === 'left');
      this.signedPointSlide.checked = this.signedPointAlign;
    } else {
      this.signedPointTitleValue = '';
      this.signedPointTime = '12:00';
      this.signedPointAlign = false;
      this.signedPointSlide.checked = this.signedPointAlign;
    }
  }

  public sidenavSave() {
    if (this.sidenavType === 'activities') {
      let activityIndex = parseInt(this.activitySelected.substring(8), 10);
      if (activityIndex > -1) {
        this.activities[activityIndex]['title'] = this.activityTitleEl.nativeElement.value;
        this.activities[activityIndex]['startTime'] = this.activityStartTimeEl.nativeElement.value;
        this.activities[activityIndex]['endTime'] = this.activityEndTimeEl.nativeElement.value;
        this.activities[activityIndex]['color'] = this.activityColorEl.nativeElement.value;
        this.activities[activityIndex]['toHighlight'] = this.activitySlide.checked.toString();
      } else {
        this.activities.push({
          title: this.activityTitleEl.nativeElement.value,
          startTime: this.activityStartTimeEl.nativeElement.value,
          endTime: this.activityEndTimeEl.nativeElement.value,
          color: this.activityColorEl.nativeElement.value,
          toHighlight: this.activitySlide.checked.toString()
        });

        this.activitySelected = 'activity' + (this.activities.length - 1);
        this.activityChanged();
      }
    } else if (this.sidenavType === 'periods') {
      let periodIndex = parseInt(this.periodSelected.substring(6), 10);
      if (periodIndex > -1) {
        this.periods[periodIndex]['title'] = this.periodTitleEl.nativeElement.value;
        this.periods[periodIndex]['startTime'] = this.periodStartTimeEl.nativeElement.value;
        this.periods[periodIndex]['endTime'] = this.periodEndTimeEl.nativeElement.value;
        this.periods[periodIndex]['background'] = this.periodSlide.checked.toString();
      } else {
        this.periods.push({
          title: this.periodTitleEl.nativeElement.value,
          startTime: this.periodStartTimeEl.nativeElement.value,
          endTime: this.periodEndTimeEl.nativeElement.value,
          background: this.periodSlide.checked.toString()
        });

        this.periodSelected = 'period' + (this.periods.length - 1);
        this.periodChanged();
      }
    } else if (this.sidenavType === 'signedPoints') {
      let signedPointIndex = parseInt(this.signedPointSelected.substring(11), 10);
      if (signedPointIndex > -1) {
        this.signedPoints[signedPointIndex]['title'] = this.signedPointTitleEl.nativeElement.value;
        this.signedPoints[signedPointIndex]['time'] = this.signedPointTimeEl.nativeElement.value;
        if (this.signedPointSlide.checked) {
          this.signedPoints[signedPointIndex]['align'] = 'left';
        } else {
          this.signedPoints[signedPointIndex]['align'] = 'right';
        }
      } else {
        let titleAlign = 'left';
        if (this.signedPointSlide.checked) {
          titleAlign = 'left';
        } else {
          titleAlign = 'right';
        }
        this.signedPoints.push({
          title: this.signedPointTitleEl.nativeElement.value,
          time: this.signedPointTimeEl.nativeElement.value,
          align: titleAlign
        });

        this.signedPointSelected = 'signedPoint' + (this.signedPoints.length - 1);
        this.signedPointChanged();
      }
    } else if (this.sidenavType === 'commonPeriods') {
      let commonPeriodIndex = parseInt(this.commonPeriodSelected.substring(12), 10);
      let commonPeriodArray = this.commonPeriods[commonPeriodIndex];
      if (commonPeriodIndex > -1) {
        commonPeriodArray['title'] = this.commonPeriodTitleEl.nativeElement.value;
        commonPeriodArray['startTime'] = this.commonPeriodStartTimeEl.nativeElement.value;
        commonPeriodArray['endTime'] = this.commonPeriodEndTimeEl.nativeElement.value;
      } else {
        this.commonPeriods.push({
          title: this.commonPeriodTitleEl.nativeElement.value,
          startTime: this.commonPeriodStartTimeEl.nativeElement.value,
          endTime: this.commonPeriodEndTimeEl.nativeElement.value
        });

        this.commonPeriodSelected = 'commonPeriod' + (this.commonPeriods.length - 1);
        this.commonPeriodChanged();
      }
    }
    this.infoGraphicDesigner();
  }

  public sidenavDelete() {
    if (this.sidenavType === 'activities') {
      let activityIndex = parseInt(this.activitySelected.substring(8), 10);
      this.activities.splice(activityIndex, 1);
      this.activitySelected = 'activity0';
      this.activityChanged();
    } else if (this.sidenavType === 'periods') {
      let periodIndex = parseInt(this.periodSelected.substring(6), 10);
      this.periods.splice(periodIndex, 1);
      this.periodSelected = 'period0';
      this.periodChanged();
    } else if (this.sidenavType === 'signedPoints') {
      let signedPointIndex = parseInt(this.signedPointSelected.substring(11), 10);
      this.signedPoints.splice(signedPointIndex, 1);
      this.signedPointSelected = 'signedPoint0';
      this.signedPointChanged();
    } else if (this.sidenavType === 'commonPeriods') {
      let commonPeriodIndex = parseInt(this.commonPeriodSelected.substring(12), 10);
      this.commonPeriods.splice(commonPeriodIndex, 1);
      this.commonPeriodSelected = 'commonPeriod0';
      this.commonPeriodChanged();
    }
    this.infoGraphicDesigner();
  }

  public exportFile() {
    let FileSaver = require('file-saver');
    let blob = new Blob([JSON.stringify(this.infoGraphicData)],
                       {type: 'application/json;charset=utf-8'});
    FileSaver.saveAs(blob, 'infoGraphic.json');
  }

  public readFile(file) {
    let reader = new FileReader();
    reader.onload = (evt) => {
      this.infoGraphicData = JSON.parse(evt.target['result']);
      this.setNewData(true);
      this.infoGraphicDesigner();
      this.scheduleChanged();
      this.activityChanged();
      this.periodChanged();
      this.commonPeriodChanged();
      this.signedPointChanged();
    };
    reader.readAsText(file);
  }

  public importFile() {
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    $(fileInput).click();
    $(fileInput).change((e) => {
      this.readFile(e.target.files[0]);
    });

  }

  public exportImage() {

    let FileSaver = require('file-saver');

    this.infoGraphicCanvas.nativeElement.toBlob((blob) => {
      FileSaver.saveAs(blob, 'infoGraphic.png');
    });
  }

  public ngOnInit() {
    let infoGraphicEl = this.infoGraphicCanvas.nativeElement;
    infoGraphicEl.width = window.innerWidth;
    this.infoGraphicDesigner();

    $(window).on('resize', () => {
      if (this.sidenav.opened) {
        infoGraphicEl.width = window.innerWidth - $('.info-graphic-sidenav').width();
      } else {
        infoGraphicEl.width = window.innerWidth;
      }
      this.infoGraphicDesigner();
    });
  }
}
