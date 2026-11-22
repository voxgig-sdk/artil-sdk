import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Teammate, TeammateListMatch } from '../ArtilTypes';
declare class TeammateEntity extends ArtilEntityBase<Teammate> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: TeammateEntity): TeammateEntity;
    list(this: any, reqmatch?: TeammateListMatch, ctrl?: Control): Promise<TeammateEntity[]>;
}
export { TeammateEntity };
