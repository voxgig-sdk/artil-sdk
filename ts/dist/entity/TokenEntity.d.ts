import { ArtilEntityBase } from '../ArtilEntityBase';
import type { ArtilSDK } from '../ArtilSDK';
import type { Control } from '../types';
import type { Token, TokenListMatch, TokenRemoveMatch } from '../ArtilTypes';
declare class TokenEntity extends ArtilEntityBase<Token> {
    constructor(client: ArtilSDK, entopts: any);
    make(this: TokenEntity): TokenEntity;
    list(this: any, reqmatch?: TokenListMatch, ctrl?: Control): Promise<TokenEntity[]>;
    remove(this: any, reqmatch?: TokenRemoveMatch, ctrl?: Control): Promise<TokenEntity>;
}
export { TokenEntity };
