import Emitter from "../utils/emitter.js";
import logger from "../utils/logger.js";
import ErrorHandler from "../handlers/errorHandler.js";
import { Client, MessageMedia } from "whatsapp-web.js";

class WhatsappProvider {
  constructor(config) {
    this._name = "<WHATSAPP_PROVIDER>";
    this.emitter = Emitter.getInstance();
    this.client = new Client();
  }

  async init() {
    try {
      logger.info(`initializing ${this._name}...`);
      await this.client.initialize()
      this.client.on("ready", () => {
        this.emitter.emit(`${this._name}Ready`);

        logger.info(`${this._name} initialized! `);
      });
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }
  async sendTextMessage(contact, message) {
    try {
      await this.client.sendMessage(contact, message);
      logger.info(`Text message sent to ${contact}`);
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }

  async sendOrder(contact, order) {
    try {
      const media = MessageMedia.fromUrl('url')
      await this.client.sendMessage(contact, media, {caption: 'caption'})
      logger.info(`Order sent to ${contact}`);
    } catch (err) {
      throw new ErrorHandler(err.message);
    }
  }

  async receiveOrder(){
    this.client.on('message', async(msg)=>{
      if(msg.body === '/order'){
        //TODO: receive order
      }
    })
  }
  static getInstance(config) {
    if (WhatsappProvider.instance) {
      return WhatsappProvider.instance;
    }
    WhatsappProvider.instance = new WhatsappProvider(config);
    return WhatsappProvider.instance;
  }
}

export default WhatsappProvider;
