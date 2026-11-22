import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Listener, ListenerListMatch } from '../ArtilTypes';
declare class ListenerEntity extends ArtilEntityBase<Listener> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: ListenerEntity): ListenerEntity;
    list(this: any, reqmatch?: ListenerListMatch, ctrl?: Control): Promise<ListenerEntity[]>;
}
export { ListenerEntity };
