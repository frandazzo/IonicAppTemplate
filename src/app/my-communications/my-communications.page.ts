import { Component, OnInit } from '@angular/core';
import {MimeSearcher} from '../utils/mime';

@Component({
  selector: 'app-my-communications',
  templateUrl: './my-communications.page.html',
  styleUrls: ['./my-communications.page.scss'],
})
export class MyCommunicationsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  testmime() {
    const mimeSearcher = new MimeSearcher();
    // tslint:disable-next-line:max-line-length
    console.log(mimeSearcher.lookup(' httpCallhttps://www.fenealweb.it/files/cartella_31/documenti/eac81bff_cb28_4032_94e0_098359a1dcc3.docx'));
  }
}
