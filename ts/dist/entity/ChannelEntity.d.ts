import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Channel, ChannelListMatch } from '../ArtilTypes';
declare class ChannelEntity extends ArtilEntityBase<Channel> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: ChannelEntity): ChannelEntity;
    list(this: any, reqmatch?: ChannelListMatch, ctrl?: Control): Promise<ChannelEntity[]>;
}
export { ChannelEntity };
