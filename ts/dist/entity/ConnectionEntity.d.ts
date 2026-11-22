import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Connection, ConnectionLoadMatch, ConnectionUpdateData } from '../ArtilTypes';
declare class ConnectionEntity extends ArtilEntityBase<Connection> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: ConnectionEntity): ConnectionEntity;
    load(this: any, reqmatch?: ConnectionLoadMatch, ctrl?: Control): Promise<ConnectionEntity>;
    update(this: any, reqdata?: ConnectionUpdateData, ctrl?: Control): Promise<ConnectionEntity>;
}
export { ConnectionEntity };
