import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Agent, AgentLoadMatch, AgentListMatch, AgentCreateData, AgentUpdateData, AgentRemoveMatch } from '../ArtilTypes';
declare class AgentEntity extends ArtilEntityBase<Agent> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: AgentEntity): AgentEntity;
    load(this: any, reqmatch?: AgentLoadMatch, ctrl?: Control): Promise<AgentEntity>;
    list(this: any, reqmatch?: AgentListMatch, ctrl?: Control): Promise<AgentEntity[]>;
    create(this: any, reqdata?: AgentCreateData, ctrl?: Control): Promise<AgentEntity>;
    update(this: any, reqdata?: AgentUpdateData, ctrl?: Control): Promise<AgentEntity>;
    remove(this: any, reqmatch?: AgentRemoveMatch, ctrl?: Control): Promise<AgentEntity>;
}
export { AgentEntity };
