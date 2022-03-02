import { Component, OnInit } from '@angular/core';
import { Plugins } from "@capacitor/core"
const { CameraPreview } = Plugins;
import { CameraPreviewOptions, CameraPreviewPictureOptions } from '@capacitor-community/camera-preview';
import '@capacitor-community/camera-preview';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: ['./preview.page.scss'],
})
export class PreviewPage implements OnInit {
  image = null;
  cameraActive = false;
  constructor(private modal: ModalController) { }

  ngOnInit() {
    this.launchCamera();
  }

  launchCamera() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'front',
      parent: 'content',
      className: '',
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.height - 200,
      toBack: false,
    };
    CameraPreview.start(cameraPreviewOptions);
    this.cameraActive = true;
  }

  async takePicture() {
    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 90
    };
    const result = await CameraPreview.capture(cameraPreviewPictureOptions);
    this.image = `data:image/jpeg;base64,${result.value}`;
    this.stopCamera();
  }

  async stopCamera() {
    await CameraPreview.stop();
    this.modal.dismiss();
  }

  async flipCamera() {
    await CameraPreview.flip();
  }

}
