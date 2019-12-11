import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'code-test';
  sortOrders: any[];
  dropdownVal: any = [];
  ticketDetails: any = [];
  userData: any = [];
  userName: string;
  selectedTab: any;
  count = 1;
  allData: any = [];
  notStartedFlag: boolean;
  inprogrssFlag: boolean;
  completedFlag: boolean = true;
  tabs: any = [];
  tickettype: any = [];
  counting = 0;
  countComplete = -1;
  countBug: number = -1;
  countTask: number = -1;
  countInprog: number = -1;
  countNotstart: number = -1;
  numbertask: any;
  counterData: any = [];
  tabsData = [];
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.user();
    this.loadMenuFlg();
    this.type();
    this.status();
  }
  /* Fuction called for User Detais*/

  user() {
    let obj = "user"
    this.ticketService.loadTicketServices(obj).subscribe((res: any) => {
      console.log(res);
      res.forEach(element => {
        this.userData.push({
          id: element.id,
          name: element.name,
          status: element.status
        });
      });
      this.userName = this.userData[0].name;
    }, err => {
      console.log(err);
    });
  }
  /* Fuction called for load service*/

  loadMenuFlg() {
    let obj = "ticket"
    this.ticketService.loadTicketServices(obj).subscribe((res: any) => {
      console.log(res);
      this.allData = res;
      // this.loadData(res);
      this.changeTab(this.userData[0].status);

    }, err => {
      console.log(err);
    });
  }
  // loadData(data){
  //   let exp =this.userData[0].status;
  //  // this.ticketDetails =[];
  //   switch (exp) {
  //     case 1:
  //       this.ticketDetails = data.filter(ele => ele.status === 1);
  //       break;
  //     case 2:
  //       this.ticketDetails = data.filter(ele => ele.status === 2);
  //       break;
  //     case 3:
  //       this.ticketDetails = data.filter(ele => ele.status === 3);
  //       break;
  //     case 4:
  //       this.ticketDetails = data.filter(ele => ele.status === 4);
  //       break;
  //     case 5:
  //       this.ticketDetails = data.filter(ele => ele.status === 5);
  //       break;

  //   }

  // }
  /* Fuction called for status*/
  type() {
    let obj = "type"
    this.ticketService.loadTicketServices(obj).subscribe((res: any) => {
      console.log(res);
      let type: any = [];
      type = res;
      type.forEach(element => {
        this.tickettype.push({
          index: this.count++,
          id: element.id,
          name: element.name + ' '
        });
      });
      this.tabsCreation();
    }, err => {
      console.log(err);
    });
  }
  /* Fuction called for status*/
  status() {
    let obj = "status"
    this.ticketService.loadTicketServices(obj).subscribe((res: any) => {
      console.log(res);
      let status: any = [];
      status = res;
      status.forEach(element => {
        this.dropdownVal.push({
          index: this.count++,
          id: element.id,
          name: element.name + ' '
        });

      });
      this.tabsCreation();

    }, err => {
      console.log(err);
    });
  }
  tabsCreation() {
    this.tabs = [];
    this.tabsData = [];
    let tab = this.tickettype.concat(this.dropdownVal);
    tab.forEach(ele => {
      let counter = [];
      this.allData.forEach(element => {
        counter[0] = this.allData.filter(ele1 => ele1.type === 1).length;
        counter[1] = this.allData.filter(ele2 => ele2.type === 2).length;
        counter[2] = this.allData.filter(ele3 => ele3.status === 1).length;
        counter[3] = this.allData.filter(ele4 => ele4.status === 2).length;
        counter[4] = this.allData.filter(ele5 => ele5.status === 3).length;
      });
      this.tabsData.push({
        id: ele.id,
        index: ele.index,
        name: ele.name,
        counter: counter
      });
      console.log(this.tabsData);

    });
    this.tabs = this.tabsData.filter((v, i, a) => a.findIndex(t => (t.index === v.index && t.index === v.index)) === i)
    console.log(this.tabs);

  }

  dropdownChange(cont, ind) {
    console.log(cont.target.value, ind);
    let statusVal: number;
    if (cont.target.value === 'Completed') {
      statusVal = 1;
    } else if (cont.target.value === 'InProgress') {
      this.inprogrssFlag = true;
      this.notStartedFlag = false;
      this.completedFlag = false;
      statusVal = 2;
    } else if (cont.target.value === 'NotStarted') {
      statusVal = 3;
    }
    this.ticketDetails.forEach((ele, i) => {
      if (ind === i) {
        ele.status = statusVal;
      }
    });
  }
  changeTab(val) {
    console.log(val);
    let exp = Number(val);
    switch (exp) {
      case 1:
        this.inprogrssFlag = false;
        this.notStartedFlag = false;
        this.completedFlag = true;
        this.countBug = 0;
        this.countComplete = 0;
        this.countInprog = 0;
        this.countNotstart = 0;
        this.countTask += 1;
        if (this.countTask <= 2) {
          this.ticketDetails = this.allData.filter(ele => ele.type === 1);
          this.countTask++;
          this.tabsCreation();

        } else {
          this.ticketDetails = [];
        }

        break;
      case 2:
        this.inprogrssFlag = false;
        this.notStartedFlag = false;
        this.completedFlag = true;
        this.countTask = 0;
        this.countComplete = 0;
        this.countInprog = 0;
        this.countNotstart = 0;
        this.countBug += 1;
        if (this.countBug <= 2) {
          this.ticketDetails = this.allData.filter(ele => ele.type === 2);
          this.countBug++;
          this.tabsCreation();

        } else {
          this.ticketDetails = [];
        }
        break;
      case 3:
        this.inprogrssFlag = false;
        this.countTask = 0;
        this.countBug = 0;
        this.countComplete += 1;
        this.countInprog = 0;
        this.completedFlag = true;
        this.notStartedFlag = false;
        this.countNotstart = 0;
        if (this.countComplete <= 2) {
          this.ticketDetails = this.allData.filter(ele => ele.status === 1);
          this.countComplete++;
          this.tabsCreation();
        } else {
          this.ticketDetails = [];
        }
        break;
      case 4:
        this.countTask = 0;
        this.countBug = 0;
        this.countComplete = 0;
        this.countInprog += 1;
        this.countNotstart = 0;
        this.completedFlag = false;
        this.inprogrssFlag = true;
        this.notStartedFlag = false;
        if (this.countInprog <= 2) {
          this.ticketDetails = this.allData.filter(ele => ele.status === 2);
          this.countInprog++;
          this.tabsCreation();
        } else {
          this.ticketDetails = [];
        }
        break;
      case 5:
        this.countTask = 0;
        this.countBug = 0;
        this.countComplete = 0;
        this.countInprog = 0;
        this.countNotstart += 1;
        this.notStartedFlag = true;
        this.completedFlag = false;
        this.inprogrssFlag = false;
        if (this.countNotstart <= 2) {
          this.ticketDetails = this.allData.filter(ele => ele.status === 3);
          this.countNotstart++;
          this.tabsCreation();
        } else {
          this.ticketDetails = [];
        }
        break;
    }
  }
}
