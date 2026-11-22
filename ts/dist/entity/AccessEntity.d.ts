import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Access, AccessUpdateData } from '../ArtilTypes';
declare class AccessEntity extends ArtilEntityBase<Access> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: AccessEntity): AccessEntity;
    update(this: any, reqdata?: AccessUpdateData, ctrl?: Control): Promise<AccessEntity>;
}
export { AccessEntity };
