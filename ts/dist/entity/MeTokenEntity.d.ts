import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { MeToken, MeTokenRemoveMatch } from '../ArtilTypes';
declare class MeTokenEntity extends ArtilEntityBase<MeToken> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: MeTokenEntity): MeTokenEntity;
    remove(this: any, reqmatch?: MeTokenRemoveMatch, ctrl?: Control): Promise<MeTokenEntity>;
}
export { MeTokenEntity };
