class Message {
  constructor(author, text) {
    this.text = text;
    this.author = author;
    this.date = Date.now();
  }
}

module.exports = Message;
