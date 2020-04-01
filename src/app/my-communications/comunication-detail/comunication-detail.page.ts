import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Capacitor, FilesystemDirectory} from '@capacitor/core';
import { Platform , ToastController} from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {MimeSearcher} from '../../utils/mime';


@Component({
  selector: 'app-comunication-detail',
  templateUrl: './comunication-detail.page.html',
  styleUrls: ['./comunication-detail.page.scss'],
})
export class ComunicationDetailPage implements OnInit {

  private  mimeSearcher: MimeSearcher;
  constructor(private http: HttpClient,
              private platform: Platform,
              private toastController: ToastController,
              private fileOpener: FileOpener) {

    this.mimeSearcher = new MimeSearcher();
  }

  ngOnInit() {
  }

  showToast(message: string) {
    this.toastController.create({
      message,
      duration: 2000
    }).then(toast => toast.present());
  }

    downloadFile() {
      const filename = 'test.docx';
      const dir = FilesystemDirectory.Documents;
     // let blobType =  'application/octet-stream';
      // 'https://www.fenealweb.it/static/images/loader.png'
// 'https://www.fenealweb.it/files/cartella_31/documenti/eac81bff_cb28_4032_94e0_098359a1dcc3.docx'//
      // tslint:disable-next-line:max-line-length
      this.http.get( 'https://www.fenealweb.it/files/cartella_31/documenti/eac81bff_cb28_4032_94e0_098359a1dcc3.docx'
          , {   responseType: 'blob' }).subscribe(a => {
        // const blob: any = new Blob([a], { type: 'application/octet-stream' });
        console.log(a);
       // blobType = a.type;
        const reader = new FileReader();
        reader.readAsDataURL(a);
        reader.onloadend = ()  => {
          const base64data: string = reader.result as string;
          console.log(base64data);

          if (!(this.platform.is('android') || this.platform.is('ios'))) {
              this.showToast('Funzionalità presente solo per android e ios');
              return;
          }

          if (!Capacitor.isPluginAvailable('Filesystem')) {
              console.log('File sytem plugin not available!!');
              return;
          }

          Capacitor.Plugins.Filesystem.writeFile( {
            data: base64data,
            directory: dir,
            path: filename
          }).then(result => {
              console.log('dati salvati correttamente: ' + result);
              this.openFile(filename, dir);

          }, error => {
            console.log('errore: ' + error);
          });

        };

      }, error => console.log (error));


    }

    openFile(path: string, directory: FilesystemDirectory ) {
      Capacitor.Plugins.Filesystem.getUri({
        path,
        directory
      }).then(uriResult => {
        const  pathData = uriResult.uri;
        console.log(pathData);
        const mimet = this.mimeSearcher.lookup(pathData);
        this.fileOpener.open(pathData, mimet).then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
      });
    }
}
