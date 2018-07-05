import { AppComponent } from './app.component';

describe('Component: AppComponent', () => {
    
    let component: AppComponent;

    beforeEach(() => {
        component = new AppComponent();
        component.scaleWidth = 50;
    });

    it('startPozX should be type of number', () => {
        expect(typeof(component.startPozX)).toEqual('number')
    });

    // it('calculateTimePoz should return array of numbers', () => {
    //     expect(typeof(component.calculateTimePoz('5:00', '5:30')[0])).toEqual('number')
    // });

    // it('calculateTimePoz should return array of numbers', () => {
    //     expect(component.calculateTimePoz('05:00', '05:30')).toEqual(component.startPozX)
    // });

    it('calculateTimePoz should return array of numbers', () => {
        // expect(component.calculateTimePozFake('05:00', '05:30')).toEqual(component.startPozX)
        expect(component.calculateTimePoz('05:00', '05:30')).toEqual([component.startPozX, Math.round(component.scaleWidth / 2)])
    });

});