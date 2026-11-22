import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Webhook, WebhookListMatch, WebhookCreateData, WebhookRemoveMatch } from '../ArtilTypes';
declare class WebhookEntity extends ArtilEntityBase<Webhook> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    list(this: any, reqmatch?: WebhookListMatch, ctrl?: Control): Promise<WebhookEntity[]>;
    create(this: any, reqdata?: WebhookCreateData, ctrl?: Control): Promise<WebhookEntity>;
    remove(this: any, reqmatch?: WebhookRemoveMatch, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
