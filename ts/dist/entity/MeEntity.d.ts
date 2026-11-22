import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Me, MeLoadMatch } from '../ArtilTypes';
declare class MeEntity extends ArtilEntityBase<Me> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: MeEntity): MeEntity;
    load(this: any, reqmatch?: MeLoadMatch, ctrl?: Control): Promise<MeEntity>;
}
export { MeEntity };
