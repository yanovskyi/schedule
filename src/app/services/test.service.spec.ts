//import { async, TestBed } from '@angular/core/testing';

//import { BehaviorSubject } from 'rxjs/Rx';

import { TestService } from './test.service';

describe('Service: TestService', () => {
    
    let service: TestService;

    beforeEach(() => {
        service = new TestService();
    });

    it('testVariable should be type of number', () => {
        //expect(service.sizeX instanceof number).toBe(true);
        expect(typeof(service.testVariable)).toEqual('number')
    });

});