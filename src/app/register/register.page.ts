import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	password: string = ""
	cpassword: string = ""

	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
		public router: Router
		) { }

	ngOnInit() {
	}

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async register() {
		const { username, password, cpassword } = this
		if(password !== cpassword) {
			this.presentAlert('Mismatched', "Confirm password and password didn't match!")
		}

		try {
			const res = await this.afAuth.createUserWithEmailAndPassword(username , password)

			this.presentAlert('Success', 'You are registered!')
			this.router.navigate(['/login'])
		

		} catch(error) {
			console.dir(error)
		}
	}

}