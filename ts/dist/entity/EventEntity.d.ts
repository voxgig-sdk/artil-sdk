import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Event, EventListMatch, EventCreateData } from '../ArtilTypes';
declare class EventEntity extends ArtilEntityBase<Event> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: EventEntity): EventEntity;
    list(this: any, reqmatch?: EventListMatch, ctrl?: Control): Promise<EventEntity[]>;
    create(this: any, reqdata?: EventCreateData, ctrl?: Control): Promise<EventEntity>;
}
export { EventEntity };
