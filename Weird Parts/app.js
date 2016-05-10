(function (global, $) {
    "use strict";
    var Greetr = function (firstName, lastName, language) {
            return new Greetr.init(firstName, lastName, language);
        },
        supportedLanguages = ["en", "es"],

        greetings = {
            en: "Hello",
            es: "Hola"
        },

        formalGreetings = {
            en: "Greetings",
            es: "Saludos"
        },

        logMessages = {
            en: "Logged in",
            es: 'Inicio sesion'
        };

    Greetr.prototype = {

        fullName: function () {
            return this.firstName + " " + this.lastName;
        },

        validate: function () {
            if (supportedLanguages.indexOf(this.language) === -1) {
                throw "Invalid language";
            } else {
                console.log('valid language');
            }
        },

        greeting: function () {
            return greetings[this.language] + ' ' + this.firstName + '!';

        },

        formalGreeting: function () {
            return formalGreetings[this.language] + ' ' + this.firstName + '!';
        },

        greet: function (formal) {
            var msg;

            if (formal) {
                msg = this.formalGreeting();

            } else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            return this;
        },

        setLanguage: function (lang) {
            this.language = lang;
            this.validate();
            return this;

        },

        log: function () {
            console.log(logMessages[this.language] + ': ' + this.firstName);
            return this;
        }



    };

    Greetr.init = function (firstName, lastName, language) {
        var self = this;
        self.firstName = firstName || "";
        self.lastName = lastName || "";
        self.language = language || "en";
        self.validate();
    };

    Greetr.init.prototype = Greetr.prototype;

    global.Greetr = global.G$ = Greetr;

})(window, jQuery);
