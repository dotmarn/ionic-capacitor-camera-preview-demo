import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PreviewPage } from '../preview/preview.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image = null;
  constructor(private modal: ModalController) {}

  async openCamera() {
    const modal = await this.modal.create({
      component: PreviewPage,
      cssClass: '',
      animated: true
    });

    modal.onDidDismiss().then((data) => {
        if (data !== null) {
            this.image = data.data;
        }
    });

    return await modal.present();
  }

}
