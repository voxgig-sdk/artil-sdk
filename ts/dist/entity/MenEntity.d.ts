import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Men, MenLoadMatch, MenRemoveMatch } from '../ArtilTypes';
declare class MenEntity extends ArtilEntityBase<Men> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: MenEntity): MenEntity;
    load(this: any, reqmatch?: MenLoadMatch, ctrl?: Control): Promise<MenEntity>;
    remove(this: any, reqmatch?: MenRemoveMatch, ctrl?: Control): Promise<MenEntity>;
}
export { MenEntity };
