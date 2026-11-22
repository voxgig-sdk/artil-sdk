import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Client, ClientListMatch } from '../ArtilTypes';
declare class ClientEntity extends ArtilEntityBase<Client> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: ClientEntity): ClientEntity;
    list(this: any, reqmatch?: ClientListMatch, ctrl?: Control): Promise<ClientEntity[]>;
}
export { ClientEntity };
