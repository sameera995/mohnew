import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Employee} from "../employee/Employee";
import {Area} from "../area/Area";
import {AreaService} from "../service/area.service";
import {EmployeeService} from "../service/employee.service";
import {subscribeTo} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  modalRef:BsModalRef;

  constructor(private modalService:BsModalService,
              private areaService:AreaService,
              private employeeService:EmployeeService) { }


  employees:Employee[];
  areas:Area[];

  ngOnInit() {


  }

  loadEmployeeByDesignation(){
    this.employeeService.findAllByDesignation("PHI").subscribe(value => this.employees = value);
  }

  loadEmployee(){
    this.employeeService.findAll().subscribe(value => this.employees = value);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
