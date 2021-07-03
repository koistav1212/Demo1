import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	username: string = ""
	password: string = ""
	constructor(public afAuth: AngularFireAuth,  public router: Router,
		public alertController: AlertController
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
	async login() {
		const { username, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.signInWithEmailAndPassword(username, password)
			this.presentAlert('Welcome', "It's Good to see you again")
			this.router.navigate(['/home'])
		
		}
     catch(err) {
			console.dir(err)
			if(err.code === "auth/user-not-found") {
				this.presentAlert('Error', "User not found please Register")
			
			}
		}
	}

}