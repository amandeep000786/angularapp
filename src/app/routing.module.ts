import { NgModule } from "@angular/core";
import{RouterModule,Routes, RouterState} from '@angular/router';
import { showEditDeleteComponent } from "./showEditDelete/showEditDelete.component";
import { insertEntryComponent } from "./insertEntry/insertEntry.component";

const routes:Routes=[
{path: '',component:showEditDeleteComponent },
{path: 'add',component:insertEntryComponent },

{path: 'add/:object',component:insertEntryComponent }

];

 

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]
})
  export class AppRoutingModule{

  }