import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Message, MessageLoadMatch, MessageListMatch, MessageCreateData } from '../ArtilTypes';
declare class MessageEntity extends ArtilEntityBase<Message> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: MessageEntity): MessageEntity;
    load(this: any, reqmatch?: MessageLoadMatch, ctrl?: Control): Promise<MessageEntity>;
    list(this: any, reqmatch?: MessageListMatch, ctrl?: Control): Promise<MessageEntity[]>;
    create(this: any, reqdata?: MessageCreateData, ctrl?: Control): Promise<MessageEntity>;
}
export { MessageEntity };
