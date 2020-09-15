"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = [];
module.exports = class Message {
    constructor(date, user, message) {
        this.date = date;
        this.user = user;
        this.message = message;
    }
    save() {
        messages.push(this);
    }
    static getAll() {
        return messages;
    }
};
//# sourceMappingURL=message.js.map