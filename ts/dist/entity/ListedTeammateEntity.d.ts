import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { ListedTeammate, ListedTeammateListMatch } from '../ArtilTypes';
declare class ListedTeammateEntity extends ArtilEntityBase<ListedTeammate> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: ListedTeammateEntity): ListedTeammateEntity;
    list(this: any, reqmatch?: ListedTeammateListMatch, ctrl?: Control): Promise<ListedTeammateEntity[]>;
}
export { ListedTeammateEntity };
