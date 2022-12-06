import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-updatenotif',
  templateUrl: './updatenotif.component.html',
  styleUrls: ['./updatenotif.component.css']
})
export class UpdatenotifComponent implements OnInit {

  @Output()
  RefreshNotif= new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  RefreshClicked(){
    this.RefreshNotif.emit("Table Utilisateur Mise a jour")
  }
}
