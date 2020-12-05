
export class AuthService {
    loggedIn = false;

    isAuthenticated () {
        const promise = new Promise ( 
            (resolve, reject)=> {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 4000);
            }
        );
        return promise;
    }

    login() {
        console.log('You are going to login!')
        this.loggedIn = true;
    }

    logout() {
        console.log('You are going to logout!')
        this.loggedIn = false;
    }
}