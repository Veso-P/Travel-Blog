export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,             // Private properties
        private _tokenExpiration: Date) {

    }

    get token () {   
        if (!this._tokenExpiration || new Date() > this._tokenExpiration) {
            return null;
        }
        return this._token;
    }
}