import { Component } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { HttpClient } from '@angular/common/http';
import {ModalController, Platform} from '@ionic/angular';
import {ModalPagePage} from '../modal-page/modal-page.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  amount: number = 5;
  backgroundImg: any;
  updateAmount(number) {
    console.log(number);
    this.amount = number;
    console.log(this.amount);
  }
  updateBackground() {
      console.log('in change');
      const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      };
      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log(base64Image);
          this.backgroundImg = base64Image;
          this.nativeStorage.setItem('backgroundImg', {img: base64Image})
              .then(
                  () => console.log('Stored item!'),
                  error => console.error('Error storing item', error)
              );
      }, (err) => {
          // Handle error
      });
  }
  dataHttp: any;
    async presentModal() {
        const modal = await this.modalController.create({
            component: ModalPagePage,
            animated: true,
            backdropDismiss: true,
            showBackdrop: true,
            cssClass: 'my-custom-modal-css',
            componentProps: {
                'amount': this.amount
            }
        });
        return await modal.present();
    }
  submitAmount() {
    console.log(this.amount);
    this.presentModal();
    // this.stripe.setPublishableKey('pk_test_KDDCWJw80KSYSXQmeTvti0jz');

    // let card = {
    //   number: '4242424242424242',
    //   expMonth: 12,
    //   expYear: 2020,
    //   cvc: '220'
    // };
    // this.stripe.createCardToken(card)
    //     .then(token => {
    //       console.log(token.id);
    //       this.dataHttp = this.httpClient.get('https://www.worldctalenthubb.com/api/stripe?id=' + token.id + '&amount=' + (this.amount * 100));
    //       this.dataHttp
    //           .subscribe(data => {
    //             console.log(data);
    //           }, error => {
    //             console.log(error);
    //           });
    //     })
    //     .catch(error => console.error(error));
  }
  getBackgroundImg() {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.nativeStorage.getItem('backgroundImg')
          .then(
              data => {
                  console.log(data);
                  this.backgroundImg = data.img;
              },
              error => {
                  console.error(error);
                  // alert('Something wrong to getting local img');
              }
          );
  }
  constructor(private stripe: Stripe, public httpClient: HttpClient, public modalController: ModalController, private camera: Camera,
              private nativeStorage: NativeStorage, public plt: Platform, private screenOrientation: ScreenOrientation) {
      this.plt.ready().then(() => {
          this.getBackgroundImg();
      });
        // this.getBackgroundImg();
        let date = new Date('9' + '-10-2020');
        console.log(date.getMonth() + 1);
      var p = {
          "p1": "value1",
          "p2": "value2",
          "p3": "value3"
      };
      let newObject = {};
      for (var key in p) {
          if (p.hasOwnProperty(key)) {
              console.log(key + " -> " + p[key]);
              console.log(key);
              console.log(p);
              if (key === 'p3') {
                  console.log('in p3');
              }
              let nTest = key;
              console.log('ntest' + nTest);
              newObject[key] = p[key];
              console.log(newObject);
          }
      }
      console.log(newObject);
  }

}
