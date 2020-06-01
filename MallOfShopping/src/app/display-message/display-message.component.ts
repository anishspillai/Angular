import {Component, Input, OnInit} from '@angular/core';
import {Message} from "primeng/messages";

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  messages: Message[] = [];

  @Input() severity: string;

  @Input() summary: string;

  @Input() detail: string;

  constructor() {
  }

  ngOnInit(): void {
    this.messages = [];
    this.messages.push({severity: this.severity, summary:this.summary, detail:this.detail});
  }
}
