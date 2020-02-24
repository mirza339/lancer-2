import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { CardIO } from '@ionic-native/card-io/ngx';
import {error} from 'util';
import {dashCaseToCamelCase} from '@angular/compiler/src/util';
import {Stripe} from '@ionic-native/stripe/ngx';
import {HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage {
  amount: number;
  // cardDetails = {number: null, month: null, year: null};
  cardDetails = {number: null, month: null, year: null, cvv: null};
  dataHttp: any;
  scan() {
    this.cardIO.canScan()
        .then(
            (res: boolean) => {
              if (res) {
                let options = {
                  requireExpiry: true,
                  requireCVV: false,
                  requirePostalCode: false,
                  hideCardIOLogo: false,
                  useCardIOLogo: true,
                };
                this.cardIO.scan(options).then((data) => {
                  console.log(data);
                  this.cardDetails.number = data.cardNumber;
                  this.cardDetails.month = data.expiryMonth;
                  this.cardDetails.year = data.expiryYear;
                  console.log(this.cardDetails);
                }).catch((error) => {
                  console.log(error);
                  alert(error);
                });
              }
            }
        );
  }
  submitCard() {
    this.presentToast('Submitting!');
    console.log(this.cardDetails);
    this.stripe.setPublishableKey('pk_test_KDDCWJw80KSYSXQmeTvti0jz');
    let card = {
      number: this.cardDetails.number,
      expMonth: this.cardDetails.month,
      expYear: this.cardDetails.year,
      cvc: this.cardDetails.cvv
    };
    this.stripe.createCardToken(card)
        .then(token => {
          this.presentToast('Detecting amount');
          console.log(token.id);
          this.dataHttp = this.httpClient.get('https://www.worldctalenthubb.com/api/stripe?id='
              + token.id + '&amount=' + (this.amount * 100));
          this.dataHttp
              .subscribe(data => {
                console.log(data);
                this.presentToast('Thanks for paying $' + this.amount );
                this.cardDetails.number = null;
                this.cardDetails.cvv = null;
                this.cardDetails.month = null;
                this.cardDetails.year = null;
              }, error => {
                alert('something wrong try again later');
                console.log(error);
              });
        })
        .catch(error => {
          console.error(error);
          // alert(error);
          this.presentToast(error);
        });
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  constructor(navParams: NavParams, private cardIO: CardIO, private stripe: Stripe, public httpClient: HttpClient,
              public toastController: ToastController) {
    this.amount = navParams.get('amount');
    console.log(this.amount);

    // this.presentToast();
    // this.scan();
  }


}
