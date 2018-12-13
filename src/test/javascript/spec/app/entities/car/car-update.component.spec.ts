/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { CarUpdateComponent } from 'app/entities/car/car-update.component';
import { CarService } from 'app/entities/car/car.service';
import { Car } from 'app/shared/model/car.model';

describe('Component Tests', () => {
    describe('Car Management Update Component', () => {
        let comp: CarUpdateComponent;
        let fixture: ComponentFixture<CarUpdateComponent>;
        let service: CarService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [CarUpdateComponent]
            })
                .overrideTemplate(CarUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CarUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Car(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.car = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Car();
                const files = {} as FileList;
                spyOn(service, 'createV2').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.car = entity;
                comp.files = files;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.createV2).toHaveBeenCalledWith(entity, files);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
